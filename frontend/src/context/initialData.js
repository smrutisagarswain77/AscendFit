// ===============================
// ASCENDFIT INITIAL GLOBAL STATE
// Temporary mock data.
// Later this will be replaced with data from the Django backend.
// ===============================

export const initialData = {
  user: {
    id: null,
    username: "Commander",
    email: "commander@ascendfit.com",

    level: 1,
    currentXP: 0,
    totalXP: 0,
    coins: 0,
    streak: 0,

    rank: "E-Rank Hunter",
    avatar: "rank_e",

    joinedDate: null,
  },

  workout: {
    activeWorkout: null,

    currentExercise: null,
    currentSet: 0,

    elapsedTime: 0,
    caloriesBurned: 0,

    isPaused: false,
    isCompleted: false,
  },

  dashboard: {
    todayXP: 0,
    todayCalories: 0,
    todayWorkouts: 0,

    weeklyXP: 0,
    monthlyXP: 0,
  },

  statistics: {
    totalWorkouts: 0,
    totalExercises: 0,

    totalHours: 0,

    personalRecords: {},
  },

  exercises: {
    exerciseList: [],
    favouriteExercises: [],
    recentExercises: [],
  },

  aiCoach: {
    dailyTip: "",

    recommendation: null,

    recoveryScore: 100,
  },

  notifications: {
    unreadCount: 0,

    items: [],
  },

  settings: {
    theme: "dark",

    animations: true,

    soundEffects: true,

    music: false,

    weightUnit: "kg",

    language: "en",

    videoQuality: "1080p",
  },
};