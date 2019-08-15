<template>
  <div style="margin-bottom: 20px;">
    <section class="demo-section">
      <h4>基本用法</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>斑马纹</h4>
      <div>
      </div>
      <x-table stripe :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>竖边框</h4>
      <div>
      </div>
      <x-table border :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>竖边框 + 斑马纹</h4>
      <div>
      </div>
      <x-table stripe border :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>固定表头</h4>
      <div>
      </div>
      <x-table border height="200" :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>固定列</h4>
      <div>
      </div>
      <x-table stripe :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in detailTableHeaders"
          :fixed="index === 3 ? 'right' : index === 1 ? 'left' : false"
          :key="index"
          :width="300"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>固定列和表头</h4>
      <div>
      </div>
      <x-table border height="300" :data="longTableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in detailTableHeaders"
          :fixed="index === 3 ? 'right' : index === 1 ? 'left' : false"
          :key="index"
          :width="300"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>多级表头</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;">
        <template v-for="(header, i) in multipleHeaders">
          <x-table-column
            v-if="header.children"
            :key="i"
            :label="header.label">
            <x-table-column
              v-for="(sub, j) in header.children"
              :key="j"
              :label="sub.label"
              :prop="sub.prop">
            </x-table-column>
          </x-table-column>
          <x-table-column
            v-else
            :key="i"
            :label="header.label"
            :prop="header.prop">
          </x-table-column>
        </template>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>多选</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;">
        <x-table-column type="selection"></x-table-column>
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>排序</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in sortableHeaders"
          :sortable="header.sortable"
          :sort-method="header.sortMethod"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>自定义</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
          <template slot="header" slot-scope="scope">
            <div style="height: 40px;line-height: 40px;background: #ddd;">{{scope.column.label}}-{{scope.$index}}</div>
          </template>
          <template slot="content" slot-scope="scope">
            <div style="padding: 10px;text-align: center;background: #eee;">{{scope.content}}-{{scope.$rowIndex}}</div>
          </template>
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>展开行</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;">
        <x-table-column type="expand">
          <template slot="expand" slot-scope="scope">
            <div style="height: 100px;line-height:100px;text-align:center;color:#cdcdcd;">这里是第{{scope.$index}}行的展开行内容</div>
          </template>
        </x-table-column>
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>合并行或列</h4>
      <div>
      </div>
      <x-table :data="tableData" style="margin: 0 20px;" :cell-span-method="cellSpanMethod">
        <template v-for="(header, i) in multipleHeaders">
          <x-table-column
            v-if="header.children"
            :key="i"
            :label="header.label">
            <x-table-column
              v-for="(sub, j) in header.children"
              :key="j"
              :label="sub.label"
              :prop="sub.prop">
            </x-table-column>
          </x-table-column>
          <x-table-column
            v-else
            :key="i"
            :label="header.label"
            :prop="header.prop">
          </x-table-column>
        </template>
      </x-table>
    </section>
    <section class="demo-section">
      <h4>窗口置顶</h4>
      <div>
      </div>
      <x-table border affix :data="longTableData" style="margin: 0 20px;">
        <x-table-column
          v-for="(header, index) in tableHeaders"
          :key="index"
          :label="header.label"
          :prop="header.prop">
        </x-table-column>
      </x-table>
    </section>
  </div>
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      rowCount: 5,
      tableHeaders: [
        { label: '用户ID', prop: 'name' },
        { label: '城市', prop: 'city' },
        { label: '最近一次使用', prop: 'lastUsedTime' }
      ],
      sortableHeaders: [
        { label: '用户ID', prop: 'name' },
        { label: '城市', prop: 'city' },
        { label: '最近一次使用', prop: 'lastUsedTime' },
        { label: '使用次数', prop: 'usedCount', sortable: true, sortMethod: this.sortMethod }
      ],
      multipleHeaders: [
        { label: '用户ID', prop: 'name' },
        { label: '最近一次使用', prop: 'lastUsedTime' },
        {
          label: '地址',
          children: [
            { label: '省份', prop: 'province' },
            { label: '城市', prop: 'city' },
            { label: '详细地址', prop: 'address' }
          ]
        }
      ],
      detailTableHeaders: [
        { label: '用户ID', prop: 'name' },
        { label: '城市', prop: 'city' },
        { label: '最近一次使用', prop: 'lastUsedTime' },
        { label: '年龄', prop: 'age' },
        { label: '性别', prop: 'gender' },
        { label: '职业', prop: 'occupation' },
        { label: '电话', prop: 'cellphone' }
      ]
    }
  },
  computed: {
    tableData () {
      const list = []
      for (let i = 0; i < this.rowCount; i++) {
        list.push({
          id: i + 1,
          name: '易小宝',
          city: '长沙',
          lastUsedTime: `2018-09-${i + 1 < 10 ? '0' + (i + 1) : (i + 1)} 12:30:33`,
          province: '湖南',
          address: '岳麓区岳麓山下',
          age: '22',
          gender: '男',
          occupation: '工程师',
          cellphone: '18888888888',
          usedCount: Math.floor(Math.random() * 10)
        })
      }
      return list
    },
    longTableData () {
      return this.tableData.concat(this.tableData.concat(this.tableData))
    }
  },
  methods: {
    cellSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 0) {
          return [1, 2]
        } else if (columnIndex === 1) {
          return [0, 0]
        }
      }
      if (columnIndex === 3) {
        if (rowIndex === 1) {
          return [2, 1]
        } else if (rowIndex === 2) {
          return [0, 0]
        }
      }
      return [1, 1]
    },
    sortMethod (a, b) {
      return a - b
    }
  }
}
</script>
