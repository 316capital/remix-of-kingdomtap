import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider, useApp } from "./contexts/AppContext";
import { WelcomePage } from "./components/WelcomePage";
import { HomePage } from "./components/HomePage";
import { AuthScreen } from "./components/AuthScreen";
import { OnboardingFlow } from "./components/OnboardingFlow";
import { PendingApproval } from "./components/PendingApproval";

const queryClient = new QueryClient();

function AppContent() {
  const { user, isOnboarded } = useApp();

  // Not logged in - show landing page
  if (!user) {
    return (
      <>
        <WelcomePage />
        <AuthScreen />
      </>
    );
  }

  // Logged in but not onboarded - show onboarding flow
  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  // Onboarded but pending approval - show pending screen
  if (user.approvalStatus === 'pending') {
    return <PendingApproval />;
  }

  // Approved - show new homepage dashboard
  return <HomePage />;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
