import type {
  AdminPollApiResponse,
  CreatePollApiRequest,
  CreatePollApiResponse,
  CreatePollFormData,
} from "~/types/poll";

/** Send a request to the API to create a new poll and return the result. */
export async function createPoll(formData: CreatePollFormData) {
  // Transform form data to be accepted by API
  const createPollRequestBody: CreatePollApiRequest = {
    title: formData.title,
    description: formData.description ?? undefined,
    adminName: formData.adminName ?? undefined,
    adminEmail: formData.adminEmail,
    hideVotes: formData.hideVotes,
    notifyOnResponse: formData.notifyOnResponse,
    choices: formData.choices.map((c) => {
      // merge time with date
      const date = new Date(c.date!);
      const [hours, minutes] = c.time!.split(":").map(Number);
      date.setHours(hours, minutes);
      return { date: date.toISOString() };
    }),
    endDate: formData.endDate
      ? new Date(formData.endDate).toISOString()
      : undefined,
  };

  const data = await $fetch<CreatePollApiResponse>("/api/polls", {
    method: "POST",
    body: createPollRequestBody,
  });

  return data;
}

/** Delete a poll and return it */
export async function deletePoll(adminUid: string) {
  const deletedPoll = await $fetch<AdminPollApiResponse>(
    `/api/polls/admin/${adminUid}`,
    {
      method: "DELETE",
    },
  );

  return deletedPoll;
}
