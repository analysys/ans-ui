<template>
  <div>
    <section class="demo-section">
      <h4>Icon用法：ans-icon-iconName</h4>
      <div>
        <table class="icon-list" cellpadding="0">
          <tr>
            <td><i class="ans-icon-arrow-down"></i><div>arrow-down</div></td>
            <td><i class="ans-icon-arrow-up"></i><div>arrow-up</div></td>
            <td><i class="ans-icon-arrow-right"></i><div>arrow-right</div></td>
            <td><i class="ans-icon-arrow-left"></i><div>arrow-left</div></td>
            <td><i class="ans-icon-arrow-to-right"></i><div>arrow-to-right</div></td>
            <td><i class="ans-icon-arrow-to-left"></i><div>arrow-to-left</div></td>
          </tr>
          <tr>
            <td><i class="ans-icon-check"></i><div>check</div></td>
            <td><i class="ans-icon-close"></i><div>close</div></td>
            <td><i class="ans-icon-calendar"></i><div>calendar</div></td>
            <td><i class="ans-icon-search"></i><div>search</div></td>
            <td><i class="ans-icon-more"></i><div>more</div></td>
            <td><i class="ans-icon-off"></i><div>off</div></td>
          </tr>
          <tr>
            <td><i class="ans-icon-success-solid"></i><div>success-solid</div></td>
            <td><i class="ans-icon-success-empty"></i><div>success-empty</div></td>
            <td><i class="ans-icon-fail-solid"></i><div>fail-solid</div></td>
            <td><i class="ans-icon-fail-empty"></i><div>fail-empty</div></td>
            <td><i class="ans-icon-warn-solid"></i><div>warn-solid</div></td>
            <td><i class="ans-icon-warn-empty"></i><div>warn-empty</div></td>
          </tr>
          <tr>
            <td><i class="ans-icon-notice-solid"></i><div>notice-solid</div></td>
            <td><i class="ans-icon-notice-empty"></i><div>notice-empty</div></td>
            <td><i class="ans-icon-spinner"></i><div>spinner</div></td>
            <td><i class="ans-icon-no-data"></i><div>no-data</div></td>
            <td><i class="ans-icon-search-no-data"></i><div>search-no-data</div></td>
          </tr>
        </table>
      </div>
   </section>
  </div>
</template>

<style lang="scss">
.icon-list {
  text-align: center;
  border-top: solid #ddd 1px;
  border-left: solid #ddd 1px;
  tr {
    height: 120px;
    td {
      width: 130px;
      border-right: solid #ddd 1px;
      border-bottom: solid #ddd 1px;
      i {
        font-size: 20px;
      }
      div {
        padding-top: 10px;
      }
    }
  }
}
</style>
