import Component from '@glimmer/component';
import { calculateAverageClients } from 'vault/utils/chart-helpers';

/**
 * @module MonthlyUsage
 * MonthlyUsage components show how many total clients use Vault each month. Displaying the average totals to the left of a stacked, vertical bar chart.
 * 
 * @example
 * ```js
  <Clients::MonthlyUsage 
    @chartLegend={{this.chartLegend}} 
    @timestamp={{this.responseTimestamp}}
    @verticalBarChartData={{this.byMonthActivityData}} 
  />
 * ```
 * @param {array} chartLegend - array of objects with key names 'key' and 'label' so data can be stacked
 * @param {string} timestamp -  ISO timestamp created in serializer to timestamp the response
 * @param {array} verticalBarChartData - array of flattened objects
    sample object = 
    {
      month: '1/22',
      entity_clients: 23,
      non_entity_clients: 45,
      clients: 68,
      namespaces: [],
      new_clients: {
        entity_clients: 11,
        non_entity_clients: 36,
        clients: 47,
        namespaces: [],
      },
    }
 * @param {array} chartLegend - array of objects with key names 'key' and 'label' so data can be stacked
 */
export default class MonthlyUsage extends Component {
  get averageTotalClients() {
    return calculateAverageClients(this.args.verticalBarChartData, 'clients') || '0';
  }

  get averageNewClients() {
    return (
      calculateAverageClients(
        this.args.verticalBarChartData.map((d) => d.new_clients),
        'clients'
      ) || '0'
    );
  }
}
