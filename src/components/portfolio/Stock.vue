<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-info">
      <div class="panel-heading">
          <h3 class="panel-title">
            {{ stock.name }}
            <small>(Price: {{ stock.price }} | Quantity: {{ stock.quantity }})</small>
          </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="quantity"
            v-model="quantity"
            :class="{danger: insufficientQuantity}"
          >
        </div>
        <div class="pull-right">
          <button
            class="btn btn-primary"
            :disabled="buttonDisabled"
            @click="sellStock">
            {{ insufficientQuantity ? 'Not enough Stocks' : 'Sell' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['stock'],
  computed: {
    insufficientQuantity () {
      const qnt = parseInt(this.quantity, 10)
      return qnt > this.stock.quantity
    },
    buttonDisabled () {
      const qnt = parseInt(this.quantity, 10)
      return this.insufficientQuantity || qnt <= 0 || !Number.isInteger(qnt)
    }
  },
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    ...mapActions({
      placeSellOrder: 'sellStock'
    }),
    sellStock () {
      const order = {
        stockId: this.stock.id,
        stockPrice: this.stock.price,
        quantity: this.quantity
      }
      this.placeSellOrder(order)
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
