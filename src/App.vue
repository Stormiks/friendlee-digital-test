<template>
  <main id="contentApp">
    <form @submit.prevent="onSubmitForm">
      <InputWrapper
        :id="'sum'"
        key="sum"
        v-model="formData.autoAmount"
        :range-min="1500000"
        :range-max="10000000"
        :range-step="1000"
      >
        <template #label>
          Стоимость автомобиля
        </template>
        <template #labelAux>
          &#8381;
        </template>
      </InputWrapper>

      <InputWrapper
        :id="'deposit'"
        key="deposit"
        v-model="formData.deposit"
        :range-min="Math.round(formData.autoAmount * 10 / 100)"
        :range-max="Math.round(formData.autoAmount * 60 / 100)"
        :range-step="1000"
        :aux-accent="true"
      >
        <template #label>
          Первоначальный взнос
        </template>
        <template #labelAux>
          {{ calculatedPercentage }}%
        </template>
      </InputWrapper>

      <InputWrapper
        :id="'leaseTerm'"
        key="lease-term"
        v-model="formData.leaseTerm"
        :range-min="6"
        :range-max="120"
        :range-step="1"
      >
        <template #label>
          Срок лизинга
        </template>
        <template #labelAux>
          мес.
        </template>
      </InputWrapper>

      <InputWrapper
        :controls="false"
      >
        <template #label>
          Сумма договора лизинга
        </template>
        <template #content>
          <span>
            {{ getSpacedNum(getPayments.totalPayment) }}
          </span>
          <span class="symbol--currency">
            &nbsp;&#8381;
          </span>
        </template>
      </InputWrapper>

      <InputWrapper
        :controls="false"
      >
        <template #label>
          Ежемесячный платеж от
        </template>
        <template #content>
          <span>
            {{ getSpacedNum(getPayments.totalMonthlyPayment) }}
          </span>
          <span class="symbol--currency">
            &nbsp;&#8381;
          </span>
        </template>
      </InputWrapper>

      <div class="input-wrapper">
        <Button
          :loading="loading"
          @click.prevent="onSubmitForm"
          @keypress.prevent="onSubmitForm"
        >
          Оставить заявку
        </Button>
      </div>
    </form>
  </main>
</template>

<script>
import { useMainStore } from './store/store.js';
import VueLoadingIndicator from '@/components/loading-indicator.jsx';
import Button from '@/components/Button.vue';
import InputWrapper from '@/components/InputWrapper.vue';
import { calcPayment } from '@/business/calculatedPayment.js';
import spacedNum from '@/utils/getSpacedNum.js';

export default {
  components: {
    VueLoadingIndicator,
    Button,
    InputWrapper
  },
  data(){
    return {
      loading: false,
      formData: {
        autoAmount: 0,
        deposit: 0,
        leaseTerm: 0
      }
    }
  },
  computed: {
    calculatedPercentage() {
      return Math.round(this.formData.deposit / this.formData.autoAmount * 100);
    },
    getPayments() {
      return calcPayment({
        autoAmount: this.formData.autoAmount,
        deposit: this.formData.deposit,
        leaseTerm: this.formData.leaseTerm
      });
    }
  },
  methods: {
    getSpacedNum: spacedNum.bind(this),
    async onSubmitForm() {
      this.loading = true;

      await setTimeout(async () => {
        await useMainStore().$patch({...this.formData});
        await useMainStore().sendFormData();
        this.loading = false;
      }, 400);
    }
  },
  created(){
    Object.assign(this.formData, useMainStore().$state);
  }
}
</script>
