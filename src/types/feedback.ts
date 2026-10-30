export interface InspectionFeedback {
  id: string;
  bookingId: string;
  specialistId: string;
  customerId: string;
  createdAt: string;
  ratings: {
    punctuality: number; // 1 to 5
    behavior: number; // 1 to 5
    technicalExpertise: number; // 1 to 5
    reportClarity: number; // 1 to 5
    overallExperience: number; // 1 to 5
  };
  comments: string;
  recommendToFriend: boolean;
  appExperienceFeedback?: string;
  moderationStatus: 'approved' | 'pending' | 'flagged';
}

export interface SupportTicket {
  id: string;
  bookingId?: string;
  customerId: string;
  category: 'booking' | 'specialist_visit' | 'report_clarification' | 'payment_refund' | 'general';
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  responses?: {
    from: 'customer' | 'support';
    message: string;
    timestamp: string;
  }[];
}
