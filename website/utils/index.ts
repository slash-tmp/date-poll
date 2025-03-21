import type {
  AdminPollApiResponse,
  CreatePollApiRequest,
  CreatePollApiResponse,
  CreatePollFormData,
  UpdatePollApiRequest,
  UpdatePollApiResponse,
  UpdatePollFormData,
  VotePollFormData,
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

/** Send a request to the API to update an existing poll and return the result. */
export async function updatePoll(
  adminUid: string,
  formData: UpdatePollFormData,
) {
  // Transform form data to be accepted by API
  const updatePollRequestBody: UpdatePollApiRequest = {
    title: formData.title,
    description: formData.description ?? undefined,
    choices: formData.choices.map((c) => {
      // merge time with date
      const date = new Date(c.date);
      const [hours, minutes] = c.time!.split(":").map(Number);
      date.setHours(hours, minutes);
      return { id: c.id, date: date.toISOString() };
    }),
    hideVotes: formData.hideVotes,
    endDate: formData.endDate
      ? new Date(formData.endDate).toISOString()
      : undefined,
    notifyOnResponse: formData.notifyOnResponse,
    adminName: formData.adminName ?? undefined,
  };

  const data = await $fetch<UpdatePollApiResponse>(
    `/api/polls/admin/${adminUid}`,
    {
      method: "PUT",
      body: updatePollRequestBody,
    },
  );

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

export async function findPoll(adminEmail: string) {
  await $fetch(`/api/polls/find`, {
    method: "POST",
    body: {
      adminEmail,
    },
  });
}

export async function votePoll(publicUid: string, formData: VotePollFormData) {
  await $fetch(`/api/polls/${publicUid}/responses`, {
    method: "POST",
    body: formData,
  });
}
