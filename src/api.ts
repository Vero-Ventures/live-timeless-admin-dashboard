import { FunctionReference, anyApi } from "convex/server";
import { GenericId as Id } from "convex/values";

export const api: PublicApiType = anyApi as unknown as PublicApiType;
export const internal: InternalApiType = anyApi as unknown as InternalApiType;

export type PublicApiType = {
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
  goals: {
    getGoalById: FunctionReference<
      "query",
      "public",
      { goalId: Id<"goals"> },
      any
    >;
    listGoals: FunctionReference<"query", "public", any, any>;
    createGoal: FunctionReference<
      "mutation",
      "public",
      {
        dailyRepeat: Array<string>;
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
        weeks: number;
      },
      any
    >;
    updateGoal: FunctionReference<
      "mutation",
      "public",
      {
        dailyRepeat: Array<string>;
        goalId: Id<"goals">;
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
        weeks: number;
      },
      any
    >;
    deleteGoal: FunctionReference<
      "mutation",
      "public",
      { goalId: Id<"goals"> },
      any
    >;
    deleteGoalAndGoalLogs: FunctionReference<
      "mutation",
      "public",
      { goalId: Id<"goals"> },
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
  goalLogs: {
    getGoalLogById: FunctionReference<
      "query",
      "public",
      { goalLogId: Id<"goalLogs"> },
      any
    >;
    getGoalLogsbyGoalId: FunctionReference<
      "query",
      "public",
      { goalId: Id<"goals"> },
      any
    >;
    listGoalLogs: FunctionReference<"query", "public", any, any>;
    createGoalLog: FunctionReference<
      "mutation",
      "public",
      {
        date: number;
        goalId: Id<"goals">;
        isComplete: boolean;
        unitsCompleted: number;
      },
      any
    >;
    updateGoalLog: FunctionReference<
      "mutation",
      "public",
      {
        date?: number;
        goalId?: Id<"goals">;
        goalLogId: Id<"goalLogs">;
        isComplete?: boolean;
        unitsCompleted?: number;
      },
      any
    >;
    deleteGoalLog: FunctionReference<
      "mutation",
      "public",
      { goalLogId: Id<"goalLogs"> },
      any
    >;
    createGoalLogsFromGoal: FunctionReference<
      "mutation",
      "public",
      { goalId: Id<"goals"> },
      any
    >;
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
};
export type InternalApiType = {};
