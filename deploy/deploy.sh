#!/bin/bash

# Configuration
APP_NAME="fairtrade-loans-webapp"
APP_ROOT="/var/www/html/fairtrade-loans-webapp"
BACKUP_ROOT="/opt/deploy/backups"
LOG_FILE="/opt/deploy/logs/deploy.log"
RELEASES_TO_KEEP=5
MAX_DAILY_BACKUPS=7

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

error_exit() {
    log "ERROR: $1"
    echo -e "${RED}ERROR: $1${NC}"
    exit 1
}

success_msg() {
    log "SUCCESS: $1"
    echo -e "${GREEN}✓ $1${NC}"
}

info_msg() {
    log "INFO: $1"
    echo -e "${YELLOW}→ $1${NC}"
}

# Check if we're in the project directory
if [ ! -f "package.json" ]; then
    error_exit "Must run from project root directory containing package.json"
fi

# Start deployment
log "=== Starting deployment of $APP_NAME ==="
info_msg "Building application..."

# Build the application
if ! npm run build; then
    error_exit "Build failed!"
fi

# Create release directory
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
RELEASE_DIR="$APP_ROOT/releases/release_$TIMESTAMP"
BACKUP_DIR="$BACKUP_ROOT/daily/backup_$TIMESTAMP"

info_msg "Creating release directory: $RELEASE_DIR"
sudo mkdir -p "$RELEASE_DIR"

# Backup current deployment if it exists
if [ -d "$APP_ROOT/current" ] && [ "$(ls -A $APP_ROOT/current 2>/dev/null)" ]; then
    info_msg "Backing up current deployment to: $BACKUP_DIR"
    sudo mkdir -p "$BACKUP_DIR"
    sudo cp -r "$APP_ROOT/current"/* "$BACKUP_DIR/" 2>/dev/null || true
    success_msg "Backup completed"
else
    info_msg "No existing deployment found, skipping backup"
fi

# Copy new build to release directory
info_msg "Copying new build to release directory..."
if [ ! -d "dist" ]; then
    error_exit "Build directory 'dist' not found!"
fi

sudo cp -r dist/* "$RELEASE_DIR/"

# Create/update symlink to new release
info_msg "Updating symlink to new release..."
sudo rm -f "$APP_ROOT/current"
sudo ln -sf "$RELEASE_DIR" "$APP_ROOT/current"

# Set proper permissions
info_msg "Setting permissions..."
sudo chown -R deploy:deploy "$APP_ROOT"
sudo chmod -R 755 "$APP_ROOT/current"

# Cleanup old releases (keep last 5)
info_msg "Cleaning up old releases..."
cd "$APP_ROOT/releases" && sudo ls -t | tail -n +$((RELEASES_TO_KEEP + 1)) | sudo xargs -I {} rm -rf {} 2>/dev/null || true

# Cleanup old daily backups (keep last 7)
info_msg "Cleaning up old backups..."
cd "$BACKUP_ROOT/daily" && sudo ls -t | tail -n +$((MAX_DAILY_BACKUPS + 1)) | sudo xargs -I {} rm -rf {} 2>/dev/null || true

success_msg "Deployment completed successfully!"
log "=== Deployment completed ==="

# Show deployment info
echo
echo -e "${GREEN}=== Deployment Summary ===${NC}"
echo "Release: $TIMESTAMP"
echo "Location: $RELEASE_DIR"
echo "Backup: $BACKUP_DIR"
echo "Live site: $APP_ROOT/current -> $RELEASE_DIR"
echo