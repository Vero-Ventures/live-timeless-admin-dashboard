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
      },
      any
    >;
    deleteGoal: FunctionReference<
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
  };
};
export type InternalApiType = {};
