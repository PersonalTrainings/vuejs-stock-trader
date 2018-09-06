<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
          <h3 class="panel-title">
            {{ stock.name }}
            <small>(Price: {{ stock.price }})</small>
          </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="quantity"
            v-model="quantity"
            :class="{danger: insufficientFunds}"
          >
        </div>
        <div class="pull-right">
          <button
            class="btn btn-success"
            :disabled="buttonDisabled"
            @click="buyStock">
            {{ insufficientFunds ? 'Insufficient Funds' : 'Buy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  computed: {
    funds () {
      return this.$store.getters.funds
    },
    insufficientFunds () {
      const qnt = parseInt(this.quantity, 10)
      return qnt * this.stock.price > this.funds
    },
    buttonDisabled () {
      const qnt = parseInt(this.quantity, 10)
      return this.insufficientFunds || qnt <= 0 || !Number.isInteger(qnt)
    }
  },
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    buyStock () {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      this.$store.dispatch('buyStock', order)
      this.quantity = 0
    }
  }
}
</script>

<style scoped>
.danger {
  border: 1px solid red;
  width: 170px;
}
/* if display width is smaller 1199px  */
@media (max-width: 1199px) {
  .danger {
    width: 100px;
  }
}
</style>
