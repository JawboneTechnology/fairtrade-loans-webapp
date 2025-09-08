// types/notifications.d.ts
export interface BaseNotification {
    id: string;
    type: string;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    human_date: string;
  }
  
  export interface GuarantorRequestData {
    loan_id: string;
    loan_number: string;
    amount: number;
    applicant_name: string;
    action_url: string;
    title: string;
    message: string;
  }
  
  export interface GuarantorRequestNotification extends BaseNotification {
    data: any;
  }
  
  export type Notification = GuarantorRequestNotification;
  
  export type NotificationsResponse = Notification[];