<template>
  <UiModal v-model="open" title="Заявка на усыновление">
    <form class="space-y-4" @submit.prevent="submit">
      <p v-if="animalName" class="text-sm text-warm-600">
        Животное: <strong class="text-warm-900">{{ animalName }}</strong>
      </p>
      <UiInput v-model="form.applicantName" label="Ваше имя" required />
      <UiInput v-model="form.phone" label="Телефон" type="tel" required />
      <UiInput v-model="form.email" label="Email (необязательно)" type="email" />
      <UiTextarea v-model="form.message" label="Сообщение куратору" :rows="4" />
      <div>
        <label class="block text-sm font-medium text-warm-700 mb-2">Предпочитаемый способ связи</label>
        <select
          v-model="form.preferredChannel"
          class="w-full px-4 py-3 border border-warm-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        >
          <option value="phone">Телефон</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="telegram">Telegram</option>
          <option value="email">Email</option>
        </select>
      </div>
      <div class="flex gap-3 justify-end pt-2">
        <UiButton type="button" variant="outline" @click="close">Отмена</UiButton>
        <UiButton type="submit" :disabled="loading">{{ loading ? 'Отправка…' : 'Отправить' }}</UiButton>
      </div>
    </form>
  </UiModal>
</template>

<script setup lang="ts">
import type { AdoptionRequestBody } from '~/types'

interface Props {
  modelValue: boolean
  animalId?: string
  animalName?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [boolean]; success: [] }>()

const open = computed({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v)
})

const toast = useToast()
const form = reactive({
  applicantName: '',
  phone: '',
  email: '',
  message: '',
  preferredChannel: 'phone' as AdoptionRequestBody['preferredChannel']
})

const loading = ref(false)

watch(open, (v) => {
  if (v) {
    form.applicantName = ''
    form.phone = ''
    form.email = ''
    form.message = props.animalName ? `Здравствуйте! Меня интересует ${props.animalName}.` : ''
    form.preferredChannel = 'phone'
  }
})

const close = () => {
  open.value = false
}

const submit = async () => {
  loading.value = true
  try {
    await $fetch('/api/request', {
      method: 'POST',
      body: {
        animalId: props.animalId,
        applicantName: form.applicantName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        preferredChannel: form.preferredChannel
      }
    })
    toast.success('Заявка отправлена. Куратор свяжется с вами.')
    emit('success')
    close()
  } catch (e: any) {
    toast.error(e?.data?.message || 'Не удалось отправить заявку')
  } finally {
    loading.value = false
  }
}
</script>
