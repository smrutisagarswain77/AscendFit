// ===============================
// ASCENDFIT INITIAL GLOBAL STATE
// Temporary mock data.
// Later this will be replaced with data from the Django backend.
// ===============================

export const initialData = {
  // ===============================
  // USER
  // ===============================
  user: {
    id: null,

    username: "Commander",
    email: "commander@ascendfit.com",

    bio: "Biometric systems tuned to absolute high-performance output vectors. Overloading routine parameters daily.",

    height: "182 cm",
    weight: "78.5 kg",
    fitnessGoal: "Hypertrophy Matrix & Neuromuscular Threshold Enhancement",

    // Progress
    level: 12,
    currentXP: 720,
    nextLevelXP: 1000,
    totalXP: 4670,

    coins: 250,

    // Fitness
    streak: 14,
    caloriesBurned: 640,
    weeklyWorkoutHours: 5,
    heartRate: 72,

    // Gamification
    rank: "Warrior",
    avatar: "blaze_core",
    dailyMissionReward: 250,



    joinedDate: "2025.10.12",
  },

  systemFeed: [
    "Workout Completed",
    "+150 XP",
    "Quest Updated",
    "AI Recommendation Ready",
    "Heart Rate Synced",
  ],

  // ===============================
  // ACTIVE WORKOUT
  // ===============================
  workouts: {
    activeWorkout: {
      id: "m_push_alpha",
      name: "PUSH DAY: OVERRIDE",

      targetXP: 350,

      completedExercises: 0,
      totalExercises: 3,

      currentExerciseIndex: 0,

      elapsedTime: 0,
      caloriesBurned: 0,
      earnedXP: 0,

      isPaused: false,
      isComplete: false,

      exercises: [
        {
          id: "ex_1",
          name: "Progressive Bench Press",
          muscleGroup: "Chest",
          secondaryMuscles: ["Triceps", "Front Delts"],

          videoFolder: "chest",
          videoFile: "video1.mp4",

          difficulty: "Intermediate",

          targetSets: 4,
          targetReps: 10,
          targetWeight: 60,

          history: {
            target: "60 kg × 10",
            lastSession: "57.5 kg × 10",
            personalBest: "65 kg × 8",
          },

          steps: [
            "Lie flat on the bench.",
            "Grip the bar slightly wider than shoulder-width.",
            "Lower the weight slowly to mid-chest.",
            "Press upward explosively while keeping shoulders locked.",
            "Repeat for the target repetition framework.",
          ],

          mistakes: [
            "Bouncing the bar forcefully off your sternum.",
            "Flaring elbows outward at a sharp 90-degree angle.",
            "Arching the lumbar spine excessively off the bench pad.",
          ],

          safety: [
            "Ensure a spotter or safety rails are active.",
            "Execute a thorough progressive warm-up first.",
            "Maintain complete kinetic control over the eccentric load phase.",
          ],
        },

        {
          id: "ex_2",
          name: "Incline Dumbbell Press",
          muscleGroup: "Chest",
          secondaryMuscles: ["Front Delts", "Triceps"],

          videoFolder: "chest",
          videoFile: "chest_02.mp4",

          difficulty: "Intermediate",

          targetSets: 3,
          targetReps: 12,
          targetWeight: 24,

          history: {
            target: "24 kg × 12",
            lastSession: "22.5 kg × 12",
            personalBest: "26 kg × 10",
          },

          steps: [
            "Set incline bench to a 30-45 degree angle.",
            "Position dumbbells at chest level with neutral wrists.",
            "Drive dumbbells up until arms are fully extended.",
            "Lower slowly down to deep chest pocket stretch.",
          ],

          mistakes: [
            "Using too steep of an angle shifting work to front delts.",
            "Clashing dumbbells together at the top of the movement.",
          ],

          safety: [
            "Keep your feet planted flat on the floor for lateral balance.",
            "Drop weights safely to the side if catastrophic failure occurs.",
          ],
        },

        {
          id: "ex_3",
          name: "Overhead Barbell Press",
          muscleGroup: "Shoulders",
          secondaryMuscles: ["Triceps", "Core"],

          videoFolder: "shoulders",
          videoFile: "shoulder_01.mp4",

          difficulty: "Advanced",

          targetSets: 3,
          targetReps: 8,
          targetWeight: 45,

          history: {
            target: "45 kg × 8",
            lastSession: "42.5 kg × 8",
            personalBest: "50 kg × 6",
          },

          steps: [
            "Rack barbell at upper chest height.",
            "Brace your core, glutes, and thighs tightly.",
            "Press bar straight overhead, clearing your chin/face.",
            "Lock out arms at the apex and hold for a brief count.",
          ],

          mistakes: [
            "Leaning backward excessively, hyperextending lower back.",
            "Failing to lock out elbows at the top peak configuration.",
          ],

          safety: [
            "Use a lifting belt if managing high relative RPE loads.",
            "Do not push past failure without micro safety arms configured.",
          ],
        },
      ],
    },

    workoutList: [
      {
        id: "w-01",
        name: "Hypertrophy Push Alpha",
        status: "In Progress",
        exercises: 6,
        duration: 52,
        calories: 480,
        date: "2026-07-08",
        readiness: "Ready",
        recovery: "High",
        aiRecommendation: true,
        category: "Push"
      },
      {
        id: "w-02",
        name: "Posterior Chain Pull Bravo",
        status: "Completed",
        exercises: 5,
        duration: 60,
        calories: 510,
        date: "2026-07-06",
        readiness: "Moderate",
        recovery: "Medium",
        aiRecommendation: false,
        category: "Pull"
      },
      {
        id: "w-03",
        name: "Anterior Quad Dominant Delta",
        status: "Draft",
        exercises: 7,
        duration: 45,
        calories: 400,
        date: "2026-07-02",
        readiness: "Rest Recommended",
        recovery: "Low",
        aiRecommendation: false,
        category: "Legs"
      }
    ]
  },

  // ===============================
  // DASHBOARD
  // ===============================
  dashboard: {
    todayXP: 0,
    todayCalories: 0,
    todayWorkouts: 0,

    weeklyXP: 0,
    monthlyXP: 0,
  },

  // ===============================
  // STATISTICS
  // ===============================
  statistics: {
    totalWorkouts: 0,
    totalExercises: 0,
    totalHours: 0,

    totalWorkoutMinutes: 158,
    longestWorkoutMinutes: 72,

    personalRecords: {},
  },

  // ===============================
  // EXERCISES
  // ===============================
  exercises: {
    exerciseList: [
      {
        id: "ex-01",
        name: "Barbell Bench Press",
        muscleGroup: "Chest",
        difficulty: "Intermediate",
        equipment: "Barbell",
        description:
          "The gold-standard upper body compounding movement targeting structural chest thickness, anterior deltoids, and triceps stabilization matrix.",
        tips: [
          "Keep your shoulder blades dynamically retracted.",
          "Maintain absolute foot grounding drive throughout execution line.",
          "Bar path should trace a slight J-curve vector."
        ]
      },
      {
        id: "ex-02",
        name: "Deficit Push-Up",
        muscleGroup: "Chest",
        difficulty: "Beginner",
        equipment: "Bodyweight",
        description:
          "Elevated platform placement maximizes fiber stretching coefficients in the deep pectoral channels while engaging full core anti-extension control.",
        tips: [
          "Do not allow your pelvic line to sag.",
          "Push fully through your palms."
        ]
      },
      {
        id: "ex-03",
        name: "Conventional Deadlift",
        muscleGroup: "Back",
        difficulty: "Advanced",
        equipment: "Barbell",
        description:
          "The ultimate posterior chain structural test requiring simultaneous execution of hip-hinge mechanics.",
        tips: [
          "Pack your lats.",
          "Drive through your heels."
        ]
      },
      {
        id: "ex-04",
        name: "Dumbbell Romanian Deadlift",
        muscleGroup: "Legs",
        difficulty: "Intermediate",
        equipment: "Dumbbell",
        description:
          "Hip hinge movement emphasizing hamstrings and glutes.",
        tips: [
          "Neutral spine.",
          "Push hips backward."
        ]
      },
      {
        id: "ex-05",
        name: "Overhead Military Press",
        muscleGroup: "Shoulders",
        difficulty: "Advanced",
        equipment: "Barbell",
        description:
          "Strict overhead press for shoulders and core.",
        tips: [
          "Squeeze glutes.",
          "Press vertically."
        ]
      },
      {
        id: "ex-06",
        name: "Incline Dumbbell Curl",
        muscleGroup: "Arms",
        difficulty: "Beginner",
        equipment: "Dumbbell",
        description:
          "Long-head focused bicep curl.",
        tips: [
          "Keep elbows back.",
          "Supinate completely."
        ]
      },
      {
        id: "ex-07",
        name: "Hanging Leg Raise",
        muscleGroup: "Core",
        difficulty: "Intermediate",
        equipment: "Bodyweight",
        description:
          "Advanced abdominal movement.",
        tips: [
          "Posterior pelvic tilt.",
          "Lower slowly."
        ]
      }
    ],

    recentlyViewed: [
      "ex-01",
      "ex-03",
      "ex-02"
    ],

    addedTracker: {},

    favouriteExercises: [],

    aiCoachRecommendation: {
      name: "Barbell Bench Press",
      muscleGroup: "Chest",
      difficulty: "Intermediate",
      reasoning:
        "System log indicates your last structural chest thread was registered 5 days ago. Recommended to initialize compound overload."
    }
  },

  // ===============================
  // AI COACH
  // ===============================
  aiCoach: {
    recoveryScore: 92,

    dailyTip:
      "Focus on controlled eccentric movements today for maximum hypertrophy.",

    recommendation: {
      workout: "PUSH DAY SYSTEM",
      targetMuscle: "Chest",
      confidence: 96,
      reason:
        "Chest has not been trained in 6 days. AI recommends a progressive push session."
    },

    conversation: [
      {
        id: "m1",
        sender: "ai",
        text: "Welcome back, Commander. Synthesizing your biometric stream data... I noticed you trained chest twice this week, but your quadriceps metrics have been flat for 6 days. Let's optimize your layout today.",
        timestamp: "10:42 AM",
        suggestions: [
          "Generate Leg Split",
          "Analyze My Progress",
          "Suggest Recovery Protocols"
        ]
      }
    ],

    history: [],

    lastPrompt: ""
  },

  // ===============================
  // NOTIFICATION CENTER
  // ===============================
  notifications: {
    unreadCount: 0,
    items: [
            {
              id: "n1",
              type: "Achievements",
              tag: "LEVEL UP",
              icon: "award",
              title: "You reached Level 12",
              message:
                "Neural performance benchmarks shattered. Metric calculations upgrading dynamically.",
              timeline: "TODAY",
              timeText: "2 minutes ago",
              isRead: false,
              priority: "achievement",
              action: {
                label: "VIEW PROFILE",
                route: "/profile",
              },
            },

            {
              id: "n2",
              type: "AI",
              tag: "AI COACH",
              icon: "cpu",
              title: "Today's recommendation is ready",
              message:
                "Adaptive split generated: High-intensity progressive load targets calibrated for deltoids.",
              timeline: "TODAY",
              timeText: "1 hour ago",
              isRead: false,
              priority: "ai",
              action: {
                label: "OPEN AI COACH",
                route: "/ai-coach",
              },
            },

            {
              id: "n3",
              type: "Workouts",
              tag: "WORKOUT",
              icon: "activity",
              title: "Push Day Completed",
              message:
                "Volume threshold exceeded previous target parameters by 8.4%.",
              timeline: "TODAY",
              timeText: "4 hours ago",
              isRead: true,
              priority: "workout",
              meta: "+120 XP",
            },

            {
              id: "n4",
              type: "Achievements",
              tag: "STREAK PROTOCOL",
              icon: "clock",
              title: "7 Day Streak Completed",
              message:
                "Consistency baseline sustained. High performance cascade multiplication engaged.",
              timeline: "YESTERDAY",
              timeText: "Yesterday",
              isRead: false,
              priority: "info",
              action: {
                label: "CLAIM REWARD",
                route: "/profile",
              },
            },

            {
              id: "n5",
              type: "System",
              tag: "SECURITY EXCLUSION",
              icon: "alert",
              title: "Encryption Key Updated",
              message:
                "Main network access credentials modified via remote terminal configuration override.",
              timeline: "This Week",
              timeText: "3 days ago",
              isRead: true,
              priority: "important",
            },

            {
              id: "n6",
              type: "Account",
              tag: "CORE ARCHITECTURE",
              icon: "user",
              title: "Registration Complete",
              message:
                "Welcome to AscendFit OS. Main authorization handshake sequence complete.",
              timeline: "Earlier",
              timeText: "1 week ago",
              isRead: true,
              priority: "info",
            },
          ],
  },

  // ===============================
  // GLOBAL SETTINGS
  // ===============================
  settings: {

    // ---------- Appearance ----------
    appearance: {
      theme: "Cyber Blue",
      hudIntensity: "Normal",
      particles: true,
      motionEffects: true,
    },

    // ---------- Notification Preferences ----------
    notifications: {
      workoutReminder: true,
      dailyQuest: true,
      levelUp: true,
      achievements: true,
      aiSuggestions: false,
    },

    // ---------- Workout Preferences ----------
    workoutPrefs: {
      restTimer: "60s",
      units: "Metric",
      goal: "Muscle Gain",
    },

    // ---------- General ----------
    soundEffects: true,
    music: false,
    language: "English",
    videoQuality: "1080p",
  },
};