import Vue from 'vue'

Vue.directive('drop-target', {
  params: [
    'accept-drop',
    'drop'
  ],
  bind: function (el) {
    this.handleDragOver = function(e) {
      if (typeof(this.vm[this.params.acceptDrop]) === 'function') {
        var dropAllowed = this.vm[this.params.acceptDrop].call(this, e);
        if (!dropAllowed) return false;
      } 
      e.preventDefault();
      e.stopPropagation();
      e.dataTransfer.dropEffect = 'move';
      el.classList.add('drag-over');
      return false;
    }.bind(this);
    this.handleDragLeave = function(e) {
      e.stopPropagation();
      el.classList.remove('drag-over');
    }.bind(this);
    this.handleDrop = function(e) {
      if (typeof(this.vm[this.params.acceptDrop]) === 'function') {
        var dropAllowed = this.vm[this.params.acceptDrop].call(this, e);
        if (!dropAllowed) return false;
      }
      e.preventDefault(); 
      e.stopPropagation();
      if (typeof(this.vm[this.params.drop]) === 'function') {
        this.vm[this.params.drop].call(this, e);
      }
      el.classList.remove('drag-over');
      return false;
    }.bind(this);
    // setup the listeners
    el.addEventListener('dragover', this.handleDragOver, false);
    el.addEventListener('dragleave', this.handleDragLeave, false);
    el.addEventListener('drop', this.handleDrop, false);
  },
  unbind: function (el) {
    // shut er' down
    el.classList.remove('dragging', 'drag-over');
    el.removeEventListener('dragover', this.handleDragOver);
    el.removeEventListener('dragleave', this.handleDragLeave);
    el.removeEventListener('drop', this.handleDrop);
  }
});

Vue.directive('drag-source', {
  params: [
    'drag-start',
    'drag-end'
  ],
  bind: function () {
    this.handleDragStart = function (e) {
      e.target.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      // Need to set to something or else drag doesn't start
      e.dataTransfer.setData('fake', '*');
      if (typeof(this.vm[this.params.dragStart]) === 'function') {
        this.vm[this.params.dragStart].call(this, e);
      }
      this.el.addEventListener('dragend', this.handleDragEnd, false);
    }.bind(this);

    this.handleDragEnd = function(e) {
      e.target.classList.remove('dragging');
      if (typeof(this.vm[this.params.dragEnd]) === 'function') {
        this.vm[this.params.dragEnd].call(this, e);
      }
    }.bind(this);

    // setup the listeners
    this.el.addEventListener('dragstart', this.handleDragStart, false);
  },
  unbind: function () {
    // shut er' down
    this.el.classList.remove('dragging', 'drag-over', 'drag-enter');
    this.el.removeEventListener('dragstart', this.handleDragStart);
    this.el.removeEventListener('dragend', this.handleDragEnd);
  }
});