/**
 * Created by Gaston Kaltner on 26/08/16.
 */

const actions = {
  /**
   * Back Button
   */
  back: {
    position: 'left',
    icon: 'arrow-left',
    callback: () => {
      window.history.back();
    }
  },
  /**
   * Cancel button
   */
  cancel: {
    position: 'left',
    icon: 'remove',
    callback: () => {}
  },
  /**
   * Calendar button
   */
  calendar: {
    customHtml: '<a href="#/calendar"><span class="glyphicon glyphicon-calendar"></span></a>',
    icon: 'remove',
    callback: () => {}
  },
  /**
   * Filter button
   */
  filter: {
    icon: 'filter',
    callback: () => {}
  },
  /**
   * Add button
   */
  add: {
    icon: 'plus',
    callback: () => {}
  },
  /**
   * Delete button
   */
  delete: {
    icon: 'trash',
    callback: () => {}
  },
  /**
   * Edit button
   */
  edit: {
    icon: 'pencil',
    callback: () => {}
  },
  /**
   * Info button
   */
  info: {
    icon: 'info-sign',
    callback: () => {}
  }
};


module.exports = actions;
