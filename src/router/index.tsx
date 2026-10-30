import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { HomePage } from '../pages/public/HomePage';
import { CarInspectionPage } from '../pages/public/CarInspectionPage';
import { BikeInspectionPage } from '../pages/public/BikeInspectionPage';
import { HowItWorksPage } from '../pages/public/HowItWorksPage';
import { PricingPage } from '../pages/public/PricingPage';
import { SampleReportPage } from '../pages/public/SampleReportPage';
import { CityHubPage } from '../pages/public/CityHubPage';
import { BecomeSpecialistPage } from '../pages/public/BecomeSpecialistPage';
import { AboutPage } from '../pages/public/AboutPage';
import { ContactPage } from '../pages/public/ContactPage';
import { FaqPage } from '../pages/public/FaqPage';
import { TermsPage } from '../pages/legal/TermsPage';
import { PrivacyPage } from '../pages/legal/PrivacyPage';
import { CancellationPolicyPage } from '../pages/legal/CancellationPolicyPage';
import { InspectionLimitationsPage } from '../pages/legal/InspectionLimitationsPage';
import { BlogListPage } from '../pages/blog/BlogListPage';
import { BlogPostPage } from '../pages/blog/BlogPostPage';

// Booking Funnel
import { VehicleStepPage } from '../pages/booking/VehicleStepPage';
import { LocationStepPage } from '../pages/booking/LocationStepPage';
import { ReviewStepPage } from '../pages/booking/ReviewStepPage';
import { CheckoutPage } from '../pages/booking/CheckoutPage';
import { BookingConfirmationPage } from '../pages/booking/BookingConfirmationPage';

// Account & Tracking
import { BookingsListPage } from '../pages/account/BookingsListPage';
import { BookingDetailPage } from '../pages/account/BookingDetailPage';
import { ReportViewPage } from '../pages/account/ReportViewPage';
import { FeedbackPage } from '../pages/account/FeedbackPage';
import { SupportPage } from '../pages/account/SupportPage';
import { ProfilePage } from '../pages/account/ProfilePage';
import { LoginPage } from '../pages/auth/LoginPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'car-inspection', element: <CarInspectionPage /> },
      { path: 'bike-inspection', element: <BikeInspectionPage /> },
      { path: 'how-it-works', element: <HowItWorksPage /> },
      { path: 'pricing', element: <PricingPage /> },
      { path: 'sample-report', element: <SampleReportPage /> },
      { path: 'cities/:city', element: <CityHubPage /> },
      { path: 'become-specialist', element: <BecomeSpecialistPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'blog', element: <BlogListPage /> },
      { path: 'blog/:slug', element: <BlogPostPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'cancellation-policy', element: <CancellationPolicyPage /> },
      { path: 'inspection-limitations', element: <InspectionLimitationsPage /> },

      // Booking Funnel Routes
      { path: 'book/vehicle', element: <VehicleStepPage /> },
      { path: 'book/location', element: <LocationStepPage /> },
      { path: 'book/review', element: <ReviewStepPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
      { path: 'booking/:id/confirmation', element: <BookingConfirmationPage /> },

      // Customer Portal Account Routes
      { path: 'account/bookings', element: <BookingsListPage /> },
      { path: 'account/bookings/:id', element: <BookingDetailPage /> },
      { path: 'account/bookings/:id/report', element: <ReportViewPage /> },
      { path: 'account/bookings/:id/feedback', element: <FeedbackPage /> },
      { path: 'account/support', element: <SupportPage /> },
      { path: 'account/profile', element: <ProfilePage /> },

      // Auth
      { path: 'login', element: <LoginPage /> },
      { path: 'signin', element: <LoginPage /> },
      { path: 'auth/login', element: <LoginPage /> },
      { path: 'auth/register', element: <LoginPage /> },

      // Fallback
      { path: '*', element: <Navigate to="/" replace /> }
    ],
  },
]);
