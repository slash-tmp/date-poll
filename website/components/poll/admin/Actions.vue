<script setup lang="ts">
defineProps<{
  title: string;
}>();

const emit = defineEmits<{
  (e: "delete"): void;
}>();

const deleteButtonRef = ref<HTMLButtonElement>();
const deleteModalRef = ref<HTMLDivElement>();
const showDeleteModal = ref(false);

async function openDeleteModal() {
  showDeleteModal.value = true;
  await nextTick();
  deleteModalRef.value?.focus();
}

function cancelDelete() {
  showDeleteModal.value = false;
  deleteButtonRef.value?.focus();
}

function confirmDelete() {
  showDeleteModal.value = false;
  emit("delete");
}
</script>

<template>
  <div>
    <NuxtLink :to="{ name: 'poll-admin-id-edit' }">
      {{ $t("pages.poll.admin.id.actions.edit") }}
    </NuxtLink>
    <br />
    <button ref="deleteButtonRef" @click="openDeleteModal">
      {{ $t("pages.poll.admin.id.actions.delete") }}
    </button>

    <Teleport to="body">
      <div
        v-if="showDeleteModal"
        ref="deleteModalRef"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-heading"
        tabindex="-1"
      >
        <h2 id="dialog-heading">
          {{ $t("pages.poll.admin.id.actions.deleteModal.title") }}
        </h2>
        <p>
          {{
            $t("pages.poll.admin.id.actions.deleteModal.description", { title })
          }}
        </p>

        <button type="button" @click="cancelDelete">
          {{ $t("pages.poll.admin.id.actions.deleteModal.cancel") }}
        </button>
        <button type="button" @click="confirmDelete">
          {{ $t("pages.poll.admin.id.actions.deleteModal.confirm") }}
        </button>
      </div>
    </Teleport>
  </div>
</template>
