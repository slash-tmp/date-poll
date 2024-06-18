<script setup lang="ts">
import Button from "~/components/Button.vue";
import Modal from "~/components/Modal.vue";

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
  <div class="actions">
    <Button variant="tertiary" :to="{ name: 'poll-admin-id-edit' }">
      {{ $t("pages.poll.admin.id.actions.edit") }}
    </Button>

    <Button ref="deleteButtonRef" variant="tertiary" @click="openDeleteModal">
      {{ $t("pages.poll.admin.id.actions.delete") }}
    </Button>

    <Modal
      v-if="showDeleteModal"
      :title="$t('pages.poll.admin.id.actions.deleteModal.title')"
      @close="cancelDelete"
    >
      <p>
        {{
          $t("pages.poll.admin.id.actions.deleteModal.description", { title })
        }}
      </p>

      <template #actions>
        <Button variant="secondary" @click="cancelDelete">
          {{ $t("pages.poll.admin.id.actions.deleteModal.cancel") }}
        </Button>
        <Button @click="confirmDelete">
          {{ $t("pages.poll.admin.id.actions.deleteModal.confirm") }}
        </Button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.actions {
  display: flex;
  gap: 0.5rem 1rem;
  flex-wrap: wrap;
  margin-block: 2rem;
}
</style>
