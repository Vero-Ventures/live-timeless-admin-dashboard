import { FunctionReference, anyApi } from "convex/server";
import { GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
  invitations: {
    sendOwnerInvitation: FunctionReference<
      "mutation",
      "public",
      { orgName: string; owner: { email: string; name: string } },
      any
    >;
    listInvitations: FunctionReference<"query", "public", any, any>;
    sendUserInvitation: FunctionReference<
      "mutation",
      "public",
      { emails: Array<string>; role: string },
      any
    >;
    resendUserInvitation: FunctionReference<
      "mutation",
      "public",
      { invitationId: Id<"invitations"> },
      any
    >;
    acceptInvitation: FunctionReference<
      "mutation",
      "public",
      { invitationId: Id<"invitations"> },
      any
    >;
    deleteInvitation: FunctionReference<
      "mutation",
      "public",
      { invitationId: Id<"invitations"> },
      any
    >;
  };
  organizations: {
    getOrganizationBySlug: FunctionReference<
      "query",
      "public",
      { slug: string },
      any
    >;
    updateOrganization: FunctionReference<
      "mutation",
      "public",
      {
        logo?: string;
        metadata?: string;
        name: string;
        organizationId: Id<"organizations">;
        slug: string;
      },
      any
    >;
    deleteOrganization: FunctionReference<
      "mutation",
      "public",
      { organizationId: Id<"organizations"> },
      any
    >;
  };
  users: {
    currentUser: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    deleteAuthAccount: FunctionReference<
      "mutation",
      "public",
      { userId: Id<"users"> },
      any
    >;
    updateProfile: FunctionReference<
      "mutation",
      "public",
      {
        dob?: number;
        email: string;
        height?: number;
        name: string;
        weight?: number;
      },
      any
    >;
    updateUserName: FunctionReference<
      "mutation",
      "public",
      { name: string },
      any
    >;
    updatePartialProfile: FunctionReference<
      "mutation",
      "public",
      { dob?: number; height?: number; weight?: number },
      any
    >;
    deleteUser: FunctionReference<
      "mutation",
      "public",
      { userId: Id<"users"> },
      any
    >;
    checkUserEmail: FunctionReference<
      "mutation",
      "public",
      { email: string },
      any
    >;
  };
  auth: {
    signIn: FunctionReference<
      "action",
      "public",
      {
        params?: any;
        provider?: string;
        refreshToken?: string;
        verifier?: string;
      },
      any
    >;
    signOut: FunctionReference<"action", "public", Record<string, never>, any>;
  };
  challenges: {
    getChallengeByIdWthHasJoined: FunctionReference<
      "query",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
    getChallengeById: FunctionReference<
      "query",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
    listChallenges: FunctionReference<"query", "public", any, any>;
    createChallenge: FunctionReference<
      "mutation",
      "public",
      {
        description: string;
        endDate: number;
        name: string;
        recurrence: string;
        repeat: Array<string>;
        startDate: number;
        tokens: number;
        unit: string;
        unitType: string;
        unitValue: number;
      },
      any
    >;
    updateChallenge: FunctionReference<
      "mutation",
      "public",
      {
        challengeId: Id<"challenges">;
        description: string;
        endDate: number;
        name: string;
        recurrence: string;
        repeat: Array<string>;
        startDate: number;
        tokens: number;
        unit: string;
        unitType: string;
        unitValue: number;
      },
      any
    >;
    deleteChallenge: FunctionReference<
      "mutation",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
    getNonInivtedUsers: FunctionReference<
      "query",
      "public",
      Record<string, never>,
      any
    >;
    joinChallenge: FunctionReference<
      "mutation",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
    leaveChallenge: FunctionReference<
      "mutation",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
    removeFromChallenge: FunctionReference<
      "mutation",
      "public",
      { challengeId: Id<"challenges">; userId: Id<"users"> },
      any
    >;
    getChallengeParticipants: FunctionReference<
      "query",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
  };
  habitLogs: {
    getHabitLogById: FunctionReference<
      "query",
      "public",
      { habitLogId: Id<"habitLogs"> },
      any
    >;
    getHabitLogsbyHabitId: FunctionReference<
      "query",
      "public",
      { habitId: Id<"habits"> },
      any
    >;
    listHabitLogs: FunctionReference<"query", "public", any, any>;
    createHabitLog: FunctionReference<
      "mutation",
      "public",
      {
        day: number;
        habitId: Id<"habits">;
        isComplete: boolean;
        month: number;
        unitsCompleted: number;
        year: number;
      },
      any
    >;
    updateHabitLog: FunctionReference<
      "mutation",
      "public",
      {
        habitLogId: Id<"habitLogs">;
        isComplete?: boolean;
        unitsCompleted?: number;
      },
      any
    >;
    getHabitLogByDate: FunctionReference<
      "query",
      "public",
      { day: number; habitId: Id<"habits">; month: number; year: number },
      any
    >;
  };
  habits: {
    getHabitByIdWithLogs: FunctionReference<
      "query",
      "public",
      { habitId: Id<"habits"> },
      any
    >;
    getHabitByIdWithLogsForCurrentMonth: FunctionReference<
      "query",
      "public",
      { habitId: Id<"habits">; month: number; year: number },
      any
    >;
    getHabitByIdWithLogForCurrentDay: FunctionReference<
      "query",
      "public",
      { day: number; habitId: Id<"habits">; month: number; year: number },
      any
    >;
    getHabitById: FunctionReference<
      "query",
      "public",
      { habitId: Id<"habits"> },
      any
    >;
    listHabits: FunctionReference<"query", "public", { date: string }, any>;
    createHabit: FunctionReference<
      "mutation",
      "public",
      {
        challengeId?: Id<"challenges">;
        dailyRepeat: Array<string>;
        intervalRepeat: number;
        monthlyRepeat: Array<number>;
        name: string;
        rate?: number;
        recurrence: string;
        repeatType: string;
        selectedIcon: string;
        selectedIconColor: string;
        startDate: number;
        timeOfDay: Array<string>;
        timeReminder: number;
        unit: string;
        unitType: string;
        unitValue: number;
      },
      any
    >;
    updateHabit: FunctionReference<
      "mutation",
      "public",
      {
        dailyRepeat: Array<string>;
        habitId: Id<"habits">;
        intervalRepeat: number;
        monthlyRepeat: Array<number>;
        name: string;
        recurrence: string;
        repeatType: string;
        selectedIcon: string;
        selectedIconColor: string;
        startDate: number;
        timeOfDay: Array<string>;
        timeReminder: number;
        unit: string;
        unitType: string;
        unitValue: number;
      },
      any
    >;
    deleteHabit: FunctionReference<
      "mutation",
      "public",
      { habitId: Id<"habits"> },
      any
    >;
  };
  tremendous: {
    listRewardsAction: FunctionReference<"action", "public", any, any>;
    getRewardAction: FunctionReference<
      "action",
      "public",
      { productId: string },
      any
    >;
  };
  messages: {
    getMessages: FunctionReference<
      "query",
      "public",
      { threadId?: string },
      any
    >;
    sendMessage: FunctionReference<
      "mutation",
      "public",
      { message: string; threadId?: string },
      any
    >;
    clear: FunctionReference<"mutation", "public", { threadId: string }, any>;
  };
  threads: {
    getThread: FunctionReference<"query", "public", Record<string, never>, any>;
    deleteThread: FunctionReference<
      "mutation",
      "public",
      { threadId: string },
      any
    >;
  };
  challengeLogs: {
    createChallengeLog: FunctionReference<
      "mutation",
      "public",
      {
        challengeId: Id<"challenges">;
        day: number;
        isComplete: boolean;
        month: number;
        unitsCompleted: number;
        year: number;
      },
      any
    >;
    getChallengeLogsById: FunctionReference<
      "query",
      "public",
      { challengeId: Id<"challenges"> },
      any
    >;
  };
};
export type InternalApiType = {};
