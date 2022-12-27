<template>
  <a-pagination
    :total="total"
    :default-current="1"
    :current="currentPage"
    :show-size-changer="showSizeChanger"
    :page-size-options="pageSizeOptions"
    :show-total="showTotal ? (total,range) => $t('COMMON.number_of_search', {
      total: total,
      from: range[0],
      to: range[1]
    }) : ''"
    :page-size="pageSize"
    show-less-items
    @change="onChange"
    @showSizeChange="onShowSizeChange">
    <!-- custom text range option -->
    <template slot="buildOptionText" slot-scope="props">
      <span>{{ props.value + $t('COMMON.piece')}}</span>
    </template>
  </a-pagination>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      type: Number,
      default: 100
    },
    pageSizeOptions: {
      type: Array,
      default: () => ['20', '50', '100']
    }
  },

  methods: {
    onShowSizeChange (current, pageSize) {
      this.$emit('changePageSize', pageSize)
    },

    onChange (pageNumber) {
      this.$emit('changePage', pageNumber)
    }
  }

}
</script>

<style lang="scss" scoped>
</style>
