import { useState } from "react";
import AppContext from "./AppContext";
import { initialData } from "./initialData";

const AppProvider = ({ children }) => {
  // ========================================
  // GLOBAL APPLICATION STATE
  // ========================================

  const [appData, setAppData] = useState(initialData);

  // ========================================
  // USER
  // ========================================

  const updateUser = (newUserData) => {
    setAppData((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...newUserData,
      },
    }));
  };

  // ========================================
  // SETTINGS
  // ========================================

  const updateSettings = (newSettings) => {
    setAppData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...newSettings,
      },
    }));
  };

  // ========================================
  // WORKOUT
  // ========================================

  const updateWorkout = (updater) => {
    setAppData((prev) => {
      if (typeof updater === "function") {
        return updater(prev);
      }

      return {
        ...prev,
        workouts: {
          ...prev.workouts,
          ...updater,
        },
      };
    });
  };

  // ========================================
  // DASHBOARD
  // ========================================

  const updateDashboard = (newDashboardData) => {
    setAppData((prev) => ({
      ...prev,
      dashboard: {
        ...prev.dashboard,
        ...newDashboardData,
      },
    }));
  };

  // ========================================
  // EXERCISES
  // ========================================

  const updateExercises = (newExerciseData) => {
    setAppData((prev) => ({
      ...prev,
      exercises: {
        ...prev.exercises,
        ...newExerciseData,
      },
    }));
  };

  // ========================================
  // AI COACH
  // ========================================

  const updateAICoach = (newAIData) => {
    setAppData((prev) => ({
      ...prev,
      aiCoach: {
        ...prev.aiCoach,
        ...newAIData,
      },
    }));
  };


  // ========================================
  // AI CHAT
  // ========================================

  const addAIMessage = (message) => {
    setAppData((prev) => ({
      ...prev,
      aiCoach: {
        ...prev.aiCoach,
        conversation: [
          ...prev.aiCoach.conversation,
          message
        ]
      }
    }));
  };

  const clearAIConversation = () => {
    setAppData((prev) => ({
      ...prev,
      aiCoach: {
        ...prev.aiCoach,
        conversation: []
      }
    }));
  };

  const setAIRecommendation = (recommendation) => {
    setAppData((prev) => ({
      ...prev,
      aiCoach: {
        ...prev.aiCoach,
        recommendation
      }
    }));
  };

  const setRecoveryScore = (score) => {
    setAppData((prev) => ({
      ...prev,
      aiCoach: {
        ...prev.aiCoach,
        recoveryScore: score
      }
    }));
  };

  const setDailyTip = (tip) => {
    setAppData((prev) => ({
      ...prev,
      aiCoach: {
        ...prev.aiCoach,
        dailyTip: tip
      }
    }));
  };

  // ========================================
  // NOTIFICATIONS
  // ========================================

  const updateNotifications = (newNotificationData) => {
    setAppData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        ...newNotificationData,
      },
    }));
  };

  const addNotification = (notification) => {
    setAppData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        items: [notification, ...prev.notifications.items],
      },
    }));
  };

  const toggleNotificationRead = (id) => {
    setAppData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        items: prev.notifications.items.map((item) =>
          item.id === id
            ? { ...item, isRead: !item.isRead }
            : item
        ),
      },
    }));
  };

  const markAllNotificationsRead = () => {
    setAppData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        items: prev.notifications.items.map((item) => ({
          ...item,
          isRead: true,
        })),
      },
    }));
  };

  const clearReadNotifications = () => {
    setAppData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        items: prev.notifications.items.filter(
          (item) => !item.isRead
        ),
      },
    }));
  };

  // ========================================
  // STATISTICS
  // ========================================

  const updateStatistics = (newStatistics) => {
    setAppData((prev) => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        ...newStatistics,
      },
    }));
  };

  return (
    <AppContext.Provider
      value={{
        appData,

        updateUser,
        updateSettings,
        updateWorkout,
        updateDashboard,
        updateExercises,
        updateAICoach,
        updateNotifications,
        updateStatistics,

        addAIMessage,
        clearAIConversation,
        setAIRecommendation,
        setRecoveryScore,
        setDailyTip,

        addNotification,
        toggleNotificationRead,
        markAllNotificationsRead,
        clearReadNotifications,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;