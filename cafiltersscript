(function () {

  /* Load Script function we may need to load jQuery from the Google's CDN */
  /* That code is world-reknown. */
  /* One source: http://snipplr.com/view/18756/loadscript/ */

  var loadScript = function (url, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";

    // If the browser is Internet Explorer.
    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState == "loaded" || script.readyState == "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
      // For any other browser.
    } else {
      script.onload = function () {
        callback();
      };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

  };

  /* This is my app's JavaScript */
  var myAppJavaScript = function ($) {
    // $ in this scope references the jQuery object we'll use.
    // Don't use jQuery, or jQuery191, use the dollar sign.
    // Do this and do that, using $.

    var url = window.location.href;

    var nowtime = new Date();

    var domainname = window.location.hostname;
    var url = window.location.href;
    var originalurl = window.location.href.split('?')[0];
    var pathslist = originalurl.split('/');

    var laststring = pathslist[pathslist.length - 1];
    var productstring = pathslist[pathslist.length - 2];

    // Get parameter
    function getParameterByName(name, url) {
      if (!url) {
        url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    // Resize Images
    function resizeImage(imageurl, size) {
      imageurl = imageurl.split('?')[0];
      var imageextension = imageurl.split('.').pop();
      if (imageextension == 'jpg') {
        imageurl = imageurl.replace('.jpg', '_' + size + 'x' + size + '.jpg');
      }

      if (imageextension == 'jpeg') {
        imageurl = imageurl.replace('.jpeg', '_' + size + 'x' + size + '.jpeg');
      }
      if (imageextension == 'png') {
        imageurl = imageurl.replace('.png', '_' + size + 'x' + size + '.png');
      }
      var convertedimage = imageurl;
      return convertedimage;
    }

    // RGB to Hexa Conversion
    var rgbToHex = function (rgb) {
      var hex = Number(rgb).toString(16);
      if (hex.length < 2) {
        hex = "0" + hex;
      }
      return hex;
    };

    var fullColorHex = function (r, g, b) {
      var red = rgbToHex(r);
      var green = rgbToHex(g);
      var blue = rgbToHex(b);
      return red + green + blue;
    };

    (function ($) {

      if (!$) {
        throw Error('jquery-parallel-ajax: jQuery not found');
      }

      var defalutOption = {
        type: 'GET',
        cache: true
      };

      var reqAmount = 0;
      var resList = {
        length: 0
      };
      var timeoutTimer = null;
      var timeoutDefault = 3000;

      function reqCallBackSuccess(idx, res, successCallback) {
        resList[idx] = res;
        resList.length++;
        if (resList.length === reqAmount) {
          successCallback(resList);
          clearTimeout(timeoutTimer);
        }
      }

      function reqCallBackError(idx, err, errorCallback) {
        if (resList.length === -1) {
          return;
        }
        resList.length = -1;
        console.error('reqCallBackError', {
          index: idx,
          error: err
        });
        errorCallback(err);
        clearTimeout(timeoutTimer);
      }

      function parallelAjax(options, success, error, timeout) {
        var ajaxOptions = [];
        if (options instanceof Array) {
          ajaxOptions = options;
        }
        else {
          ajaxOptions.push(options);
        }
        // set ajax amount
        reqAmount = ajaxOptions.length;
        for (var i = 0; i < ajaxOptions.length; i++) {
          (function (arg) {
            // combine defalut option
            $.extend(ajaxOptions[i], defalutOption);
            // add success callback
            ajaxOptions[i].success = function (res) {
              reqCallBackSuccess(arg, res, success);
            }
            // add fail callback
            ajaxOptions[i].error = function (err) {
              reqCallBackError(arg, err, error);
            }
          })(i);
        }

        // do the reqests
        for (var i = 0; i < ajaxOptions.length; i++) {
          $.ajax(ajaxOptions[i]);
        }

        // set timeout
        timeoutTimer = setTimeout(function () {
          resList.length = -1;
          error({ msg: 'timeout' });
        }, timeout || timeoutDefault);
      }

      $.extend({
        'parallelAjax': parallelAjax
      })
    })($);
    $.extend({
      getValues: function (url) {
        var result = null;
        $.ajax({
          url: url,
          type: 'get',
          dataType: 'json',
          async: false,
          success: function (data) {
            result = data;
          }
        });
        return result;
      }
    });
    Array.prototype.removeByVal = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
          this.splice(i, 1);
          i--;
        }
      }
      return this;
    }


    $(document).ready(function () {
      // Instant Page
      
      // Popover
      ;(function($){

        var GPopover = function(element, options) {
          this.options = null;
          this.$trigger = null;
          this.$popover = null;

          this.init(element, options);
        }

        GPopover.prototype.init = function(element, options) {
          var that = this;

          this.options = $.extend({}, $.fn.gpopover.defaults, options);

          this.$trigger = $(element);
          this.$popover = $('#' + this.$trigger.data('popover'));

          this._addArrowElements();

          if (this.options.preventHide) {
            this._preventHideClickPropagation();
          }

          this.$trigger.click(function(e){
            if (! that.$popover.is(":visible")) {
              // Trigger a click on the parent element (that can bubble up)
              $(this).parent().click();

              that.show();

              e.stopPropagation();
            }

            e.preventDefault();
          });
        }

        GPopover.prototype.show = function() {
          var that = this;

          // Set width before showing
          this.$popover.width(this.options.width);

          // Show the popover
          this.$popover.fadeIn(this.options.fadeInDuration);

          // Set up hiding
          $(document).one('click.popoverHide', function() {
            // _hidePopover($popover, settings);
            that.hide();
          });

          // Sort out the position (must be done after showing)
          var triggerPos = this.$trigger.offset();
          this.$popover.offset({
            left: (triggerPos.left + (this.$trigger.outerWidth() / 2)) - (this.$popover.outerWidth() / 2),
            top: triggerPos.top + this.$trigger.outerHeight() + 10  
            // the final 10 above allows room for the arrow above it
          });

          // Check and reposition if out of the viewport
          var positionXCorrection = this._repositionForViewportSides();

          // Set the position of the arrow elements
          this._setArrowPosition(positionXCorrection);

          // Call the callback
          this.options.onShow.call(this.$trigger, this.$popover);
        }

        GPopover.prototype.hide = function() {
          // Hide the popover
          this.$popover.fadeOut(this.options.fadeOutDuration);

          // Call the callback
          this.options.onHide.call(this.$trigger, this.$popover);
        }

        GPopover.prototype._addArrowElements = function() {
          this.$arrow = $('<div class="gpopover-arrow"></div>');
          this.$arrowShadow = $('<div class="gpopover-arrow-shadow"></div>');

          this.$popover.append(this.$arrow);
          this.$popover.append(this.$arrowShadow);
        }

        GPopover.prototype._preventHideClickPropagation = function() {
          /* Prevent clicks within the popover from being propagated 
           to the document (and thus stop the popover from being 
           hidden) */
          this.$popover.click(function(e) { e.stopPropagation(); });
        }

        GPopover.prototype._repositionForViewportSides = function() {
          var popoverOffsetLeft = this.$popover.offset().left,
              positionXCorrection = 0,
              $window = $(window);

          // Right edge
          if (popoverOffsetLeft + this.$popover.outerWidth() + this.options.viewportSideMargin > $window.width()) {
            var rightEdgeCorrection = -((popoverOffsetLeft + this.$popover.outerWidth() + this.options.viewportSideMargin) - $window.width());
            popoverOffsetLeft = popoverOffsetLeft + rightEdgeCorrection

            positionXCorrection = rightEdgeCorrection;
          }

          // Left edge
          if (popoverOffsetLeft < this.options.viewportSideMargin) {
            var leftEdgeCorrection = this.options.viewportSideMargin - popoverOffsetLeft;
            popoverOffsetLeft = popoverOffsetLeft + leftEdgeCorrection

            positionXCorrection += leftEdgeCorrection;
          }

          // Reposition the popover element if necessary
          if (positionXCorrection !== 0) {
            this.$popover.offset({ left: popoverOffsetLeft });
          }

          return positionXCorrection;
        }

        GPopover.prototype._setArrowPosition = function(positionXCorrection) {
          var leftPosition = (this.$popover.outerWidth() / 2) - (this.$arrow.outerWidth() / 2) - positionXCorrection;

          this.$arrow.css({ top: -7, left: leftPosition });
          this.$arrowShadow.css({ top: -8, left: leftPosition });
        }

        $.fn.gpopover = function(option) {
          return this.each(function(){
            var $this = $(this),
                data = $this.data('gpopover'),
                options = (typeof option == 'object' && option);

            // Initialise if not already done
            if (!data) {
              data = new GPopover(this, options);
              $this.data('gpopover', data);
            }

            // If the option parameter was a string, trigger the named function
            if (typeof option == 'string') data[option]();
          });

        };

        // Default settings
        $.fn.gpopover.defaults = {
          width: 250,             // Width of the popover
          fadeInDuration: 65,     // Duration of popover fade-in animation
          fadeOutDuration: 65,    // Duration of popover fade-out animation
          viewportSideMargin: 10, // Space to leave the side if out the viewport
          preventHide: false,     // Prevent hide when clicking within popover

          onShow: function() {},  // Called upon showing the popover
          onHide: function() {}   // Called upon hiding the popover
        };

      })($);
      var options = {
        data: ["blue", "green", "pink", "red", "yellow"]
      };

      var _searchskeletondiv = '<div class="container">' +
          '<ul class="list">' +    
          '<li class="item">' +
          '<div class="card-demo">' +
          '<div class="infos">' +
          '<div class="thumbnail"></div>' +         
          '</div>' +
          '<div class="title">' +
          '<span class=skeleton-bone></span>' +
          '<span class=skeleton-bone></span>' +
          '</div>' +
          '</div>' +
          '</li>' +
          '<li class="item">' +
          '<div class="card-demo">' +
          '<div class="infos">' +
          '<div class="thumbnail"></div>' +         
          '</div>' +
          '<div class="title">' +
          '<span class=skeleton-bone></span>' +
          '</div>' +
          '</div>' +
          '</li>' +
          '<li class="item">' +
          '<div class="card-demo">' +
          '<div class="infos">' +
          '<div class="thumbnail"></div>' +         
          '</div>' +
          '<div class="title">' +
          '<span class=skeleton-bone></span>' +
          '<span class=skeleton-bone></span>' +
          '<span class=skeleton-bone></span>' +
          '</div>' +
          '</div>' +
          '</li>' +
          '</ul>' +
          '</div>';

      var _searchinputElement = '<div id="ca_search_inputelement_div">' + 
          '<input data-popover="ca_search_pop_div" type="search" id="ca_search_inputelement" name="ca_search_inputelement" value="" placeholder="Search" />' +           
          '</div>'+ 
          '<div id="ca_search_pop_content_div">' +
          '<div id="ca_search_pop_content">' +         
          _searchskeletondiv +
          '</div>';



      // $('body').append(_searchinputElement);
      var _header = document.querySelectorAll('header')[0];
      if(_header != null)
      {
        console.log(_header);
        $(_header).after(_searchinputElement);
      }
      var _search_pop_content = document.getElementById('ca_search_pop_div');
      // const ca_search_pop_instance = tippy(document.querySelector('#ca_search_inputelement'));
      /*tippy(_searchinputElement, {
        content: _search_pop_content.innerHTML,
        allowHTML: true,
      });*/

      ;(function($){
        $.fn.extend({
          donetyping: function(callback,timeout){
            timeout = timeout || 5e2; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                  if (!timeoutReference) return;
                  timeoutReference = null;
                  callback.call(el);
                };
            return this.each(function(i,el){
              var $el = $(el);
              // Chrome Fix (Use keyup over keypress to detect backspace)
              // thank you @palerdot
              $el.is(':input') && $el.on('keyup keypress paste',function(e){
                // This catches the backspace button in chrome, but also prevents
                // the event from triggering too preemptively. Without this line,
                // using tab/shift+tab will make the focused element fire the callback.
                if (e.type=='keyup' && e.keyCode!=8) return;

                // Check if timeout has been set. If it has, "reset" the clock and
                // start over again.
                if (timeoutReference) clearTimeout(timeoutReference);
                timeoutReference = setTimeout(function(){
                  // if we made it here, our timeout has elapsed. Fire the
                  // callback
                  doneTyping(el);
                }, timeout);
              }).on('blur',function(){
                // If we can, fire the event since we're leaving the field
                doneTyping(el);
              });
            });
          }
        });
      })($);


      $('#ca_search_inputelement').donetyping(function(e){
        //$('#example-output').text('Event last fired @ ' + (new Date().toUTCString()));
        //alert('Event last fired @ ' + (new Date().toUTCString()));
        var _searchedtext = document.getElementById('ca_search_inputelement');
        console.log(_searchedtext.value);
        var _filterquery = _searchedtext.value
        let _filterquerygraphql = `query
{
products(first: 8, query:"` + _filterquery + `") {
pageInfo
{
hasNextPage
hasPreviousPage
}
edges {
node {    
handle
images(first: 1)
{
edges
{
node
{
originalSrc
}
}
}         
onlineStoreUrl
}
}
}
}`;
        //console.log(_filterquerygraphql);
        let storefrontapi_settings_ = {
          'async': true,
          'crossDomain': true,
          'url': 'https://shopthelookdemo.myshopify.com/api/graphql',
          'method': 'POST',
          'dataType': 'json',
          'headers': {
            'X-Shopify-Storefront-Access-Token': 'ee90cada357cda7c419ce03ae75249b9',
            'Content-Type': 'application/graphql',
            'Accept': 'application/json'
          },
          'data': _filterquerygraphql
        };
        // Get checkout URL from shopify
        $.ajax(storefrontapi_settings_).done(function (response) {
          console.log(response);
          $('#ca_search_pop_content_div').show();
        });

      });

      $('#ca_search_inputelement_div').on('input', '#ca_search_inputelement', function (e) {
        //alert('clicked');

        var _searchedtext = e.currentTarget;
        console.log(_searchedtext.value);
        //ca_search_pop_instance.show();
        /*$('#ca_search_inputelement').popover({
          title : 'My Title',
          content : '<p style="color: blue;">Content</p>'
        });*/
        //$('#ca_search_inputelement').gpopover('show');
        $('#ca_search_pop_div').show();


      });

      /*$.parallelAjax(_parallel_array, function(response) {
        console.info(response);
      }, function(error) {
        console.info('error', error);
      }, 250000);*/
      $.cachedScript = function(url, options) {

        // Allow user to set any option except for dataType, cache, and url
        options = $.extend(options || {}, {
          dataType: "script",
          cache: true,
          url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return $.ajax(options);
      };
      if(url.indexOf('design_theme_id') !== -1)
      {
        console.log('THEME EDITOR');
        //$('#shopify-section-ca_cfiltershtml_section').show();
        var originalurl = window.location.href.split('?')[0];
        var pathslist = originalurl.split('/');

        var laststring = pathslist[pathslist.length - 1];
        var productstring = pathslist[pathslist.length - 2];
        //var _sortElement = document.getElementById('ca_filter_sortbydiv');
        //var _parentElement = _gridselector.parentElement; 

        var acc = document.getElementsByClassName("ca_filter_accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("ca_filter_active");
            var panel = this.nextElementSibling;
            console.log(panel.style.maxHeight);
            if (panel.style.maxHeight == 0){
              console.log('null');
              panel.style.maxHeight = null;
            } else {
              console.log('null');
              panel.style.maxHeight = "0px";
            } 
          });
        }


        // Relocate filters location

        //var _filtertype = document.getElementById('ca_filter_typevalue').value;
        var _filtertype = 'Vertical';
        //var _viewmoreBtn = document.getElementById('ca_swatchy_filtery_viewmorebtndiv');
        var _filterElement = document.getElementById('ca_filterdiv');
        //$(_gridselector).after(_viewmoreBtn);
        var domainName = window.location.hostname;
        domainName = domainName.replace('www.', '');
        /*var _allproductscount = document.getElementById('ca_filters_productscount').value * 1;
       var _allproductscountindex = Math.ceil(_allproductscount /250);
       var _parallelajax_collection_urls_ = [];
       var _products_json;
       var _products_response = '';*/
        // $('#shopify-section-ca_cfiltershtml_section').show();
        /* if(_filtertype == 'Vertical')
       {
         $('#ca_filterdiv').show();
         //console.log(_queryselector);
         //console.log(_filterElement);
         var _gridselector = document.querySelector(_queryselector);

         _filterElement.style.width = '20%';
         _filterElement.style.float = 'left';
         _filterElement.style.display = 'block';
         _gridselector.style.width = '70%';
         _gridselector.style.float = 'right';       
         $(_gridselector).before(_filterElement);

       }

       if(_filtertype == 'Horizontal')
       {
         var _gridselector = document.querySelector(_queryselector);
         $(_gridselector).before(_filterElement);
       }*/
      }
      else
      {
        console.log('LIVE STORE');
      }

      var _queryselector = '.grid--uniform';
      function _FilterMethodNew_StorefrontAPI()
      {
        var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
        var _skeletondiv = document.getElementById('ca_filters_skeletondiv');
        //_productsgridDiv.style.opacity = '0.5';
        //_productsgridDiv.innerHTML = '';
        var _skeletondivclone = $(_skeletondiv).clone();
        $(_skeletondivclone).appendTo(_productsgridDiv);            
        $(_skeletondivclone).show();
        var _producttype = document.getElementById('ca_filtervalue_producttype').value;
        var _vendor = document.getElementById('ca_filtervalue_vendor').value;
        var _budget = document.getElementById('ca_filtervalue_budget').value;

        var _options_Values = document.querySelectorAll('.ca_filter_variant_option_inputs');
        console.log(_options_Values);
        var _optionsValues = '';
        for(var _oo=0; _oo<_options_Values.length; _oo++)
        {
          if(_options_Values[_oo] != '')
          {
            var _option_Name = _options_Values[_oo].id;
            if(_optionsValues == '')
            {
              _optionsValues = _option_Name + '_' + _options_Values[_oo].value;
            }
            else
            {
              _optionsValues = _optionsValues + '#' + _option_Name + '_' + _options_Values[_oo].value;
            }
          }

        }

        // ProductTypeQuery
        var _producttypesList = _producttype.split(',');
        var _producttypequery = '';
        for(var _P=0; _P<_producttypesList.length; _P++)
        {
          if(_producttypequery == '')
          {
            _producttypequery = "'" + _producttypesList[_P] + "'";
          }
          else
          {
            _producttypequery = _producttypequery + " OR " + "'" + _producttypesList[_P] + "'";
          }
        }

        _producttypequery = "(" + _producttypequery + ")";
        // VendorQuery
        var _productvendorsList = _vendor.split(',');
        var _productvendorquery = '';
        for(var _V=0; _V<_productvendorsList.length; _V++)
        {
          if(_productvendorquery == '')
          {
            _productvendorquery = "'" + _productvendorsList[_V] + "'";
          }
          else
          {
            _productvendorquery = _productvendorquery + " OR " + "'" + _productvendorsList[_V] + "'";
          }
        }
        _productvendorquery = "(" + _productvendorquery + ")";
        var _filterquery = '';
        if(_producttypequery != "('')")
        {
          _filterquery = _producttypequery;
        }

        if(_productvendorquery != "('')")
        {
          if(_producttypequery != "('')")
          {
            _filterquery = _filterquery + ' AND ' + _productvendorquery;
          }
          else
          {
            _filterquery = _productvendorquery;
          }

        }

        //_filterquery = "('Sleeveless Top' OR 'Shirts' OR 'Plain Tops' OR 'Striped Tops' OR 'Checked Tops' OR 'Kids Tops') AND ('Reddish')";
        let _filterquerygraphql = `query
{
products(first: 12, query:"` + _filterquery + `", sortKey:TITLE, reverse: false) {
pageInfo
{
hasNextPage
}
edges {
node {    
handle
}
}
}
}
`;
        let storefrontapi_settings = {
          'async': true,
          'crossDomain': true,
          'url': 'https://shopthelookdemo.myshopify.com/api/graphql',
          'method': 'POST',
          'dataType': 'json',
          'headers': {
            'X-Shopify-Storefront-Access-Token': 'ee90cada357cda7c419ce03ae75249b9',
            'Content-Type': 'application/graphql',
            'Accept': 'application/json'
          },
          'data': _filterquerygraphql
        };
        // Get checkout URL from shopify
        $.ajax(storefrontapi_settings).done(function (response) {

          var _filtethasnextpage = response.data.products.pageInfo.hasNextPage;
          console.log(_filtethasnextpage);
          if(_filtethasnextpage == 'true')
          {
            $('#ca_paginationbtnnext').prop("disabled", false);
          }
          else
          {
            $('#ca_paginationbtnnext').prop("disabled", true);
          }
          var _filteredproducts= response.data.products.edges;
          console.log(_filteredproducts);
          document.getElementById('caf_filterresults_input').value = _filteredproducts;
          //Update Products Grid by JS
          var result = _filteredproducts;
          var _productstodisplaystring = '';
          for(var _r=0; _r<_filteredproducts.length; _r++)
          {
            if(_productstodisplaystring == '')
            {
              _productstodisplaystring = _filteredproducts[_r].node.handle;
            }
            else
            {
              _productstodisplaystring = _productstodisplaystring + ',' + _filteredproducts[_r].node.handle;
            }

          }
          var _filtercount = result.length;
          /*var _titletext = document.getElementById('ca_filter_bar_text');
          _titletext.innerHTML = _filtercount + ' products found';*/
          var result = result.slice(0, 8);
          var _filtersString = '';
          var _filterType = $('#ca_filtervalue_producttype');


          var _productstodisplayArray = _productstodisplaystring.split(',');         
          //var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
          //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');        
          //var _urltoloadfilter = 'https://' + domainName + '/collections/' + laststring  + '?q=' + _productstodisplaystring;

          $(_skeletondivclone).hide();
          //var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
          var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring;
          //var _url_ToLoad = window.location.origin + '/search?q=' + _productstodisplaystring;

          console.log(_url_ToLoad);
          // window.history.replaceState({}, "Cupel Boutique", _url_ToLoad);
          //window.top.location.reload(false);

          $("#caf_collectionsgrid").load(_url_ToLoad +" #caf_collectionsgrid>*","", function(responseTxt, statusTxt, xhr){
            _productsgridDiv.style.opacity = '1';
            // secompp quickview
            if ((typeof SCAShopify) !== 'undefined') {
              SCAShopify.jQuery(document).unbind('click.fb-start');
              SCAShopify.loaded = false;
              SCAQVinit = undefined;
              $.getScript($('script[src*="sca-qv-"]').attr('src'));
            }
          });
          /*setTimeout(function(){ 
            $.ajax({
              url: _url_ToLoad,
              type: 'GET',
              async: true,
              dataType: 'html', // added data type
              success: function(result) {
                //console.log(res);
                //_html = $.parseHTML(result);
                //console.log(_html);

                //$('.ca_filters_skeletondiv').hide();     

                var containerElement = document.getElementById('caf_collectionsgrid');    
                containerElement.innerHTML = '';

                var newContainer = $(result).find('#caf_collectionsgrid')[0];  
                containerElement.insertAdjacentHTML('beforeend', newContainer.innerHTML);  


                $('script').each(function() {
                  var oldSrc = $(this).attr('src');

                  if(oldSrc != null)
                  {
                    //_Scripttags.push(oldSrc);
                    //oldSrc.includes('starapps')
                    if(oldSrc.includes('wish') || oldSrc.includes('buy-me') 
                       || oldSrc.includes('swatch') || oldSrc.includes('quickview') ||
                       oldSrc.includes('doubly'))
                    {

                      //console.log(oldSrc);
                      // Usage
                      $.cachedScript(oldSrc).done(function(script, textStatus) {
                        //console.log(textStatus);
                      });

                      //$.getScript(oldSrc);
                    }
                  }
                });

                // secompp quickview
                if ((typeof SCAShopify) !== 'undefined') {
                  SCAShopify.jQuery(document).unbind('click.fb-start');
                  SCAShopify.loaded = false;
                  SCAQVinit = undefined;
                  $.getScript($('script[src*="sca-qv-"]').attr('src'));
                }
              }
            });
          }, 20);*/
        });

      }
      function getSortByValues(sort_by)
      {
        var sortbyvalues = [];
        if(sort_by == 'best-selling')
        {
          sortbyvalues.push('BEST_SELLING');
          sortbyvalues.push(false);
        }
        if(sort_by == 'title-ascending')
        {
          sortbyvalues.push('TITLE');
          sortbyvalues.push(false);
        }
        if(sort_by == 'title-descending')
        {
          sortbyvalues.push('TITLE');
          sortbyvalues.push(true);
        }
        if(sort_by == 'price-ascending')
        {
          sortbyvalues.push('PRICE');
          sortbyvalues.push(false);
        }
        if(sort_by == 'price-descending')
        {
          sortbyvalues.push('PRICE');
          sortbyvalues.push(true);
        }
        if(sort_by == 'created-ascending')
        {
          sortbyvalues.push('CREATED_AT');
          sortbyvalues.push(false);
        }
        if(sort_by == 'created-descending')
        {
          sortbyvalues.push('CREATED_AT');
          sortbyvalues.push(true);
        }
        return sortbyvalues;
      }
      function _FilterMethodNew_StorefrontAPI_LoadURL(_url_toload)
      {
        var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
       var _gridImages = $(_productsgridDiv).find('img');
        //console.log(_gridImages);
        for(var g=0; g<_gridImages.length; g++)
        {
          _gridImages[g].src = '';
        }
         var _gridImages = $(_productsgridDiv).find('img');
        //console.log(_gridImages);
        //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');
        _productsgridDiv.style.opacity = '0.5';
        //window.location.reload();
        //var _url_toload = document.getElementById('caf_filterresults_url').value;
        //console.log(_url_toload);
        /*$('html, body').animate({
            scrollTop: $("#caf_collectionsgrid").offset().top
          }, 2000);*/
        $("#caf_collectionsgrid").load(_url_toload +" #caf_collectionsgrid>*","", function(responseTxt, statusTxt, xhr){
          _productsgridDiv.style.opacity = '1';
          // secompp quickview

           
          if ((typeof SCAShopify) !== 'undefined') {
            SCAShopify.jQuery(document).unbind('click.fb-start');
            SCAShopify.loaded = false;
            SCAQVinit = undefined;
            $.getScript($('script[src*="sca-qv-"]').attr('src'));
          }
        });
      }
      function _FilterMethodNew_StorefrontAPI_SaveURL(sortby)
      {
        window.result = '';
        //var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
        //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');
        //_productsgridDiv.style.opacity = '0.5';
        //_productsgridDiv.innerHTML = '';
        //var _skeletondivclone = $(_skeletondiv).clone();
        //$(_skeletondivclone).appendTo(_productsgridDiv);            
        //$(_skeletondivclone).show();
        var _producttype = document.getElementById('ca_filtervalue_producttype').value;
        var _vendor = document.getElementById('ca_filtervalue_vendor').value;
        var _budget = document.getElementById('ca_filtervalue_budget').value;

        var _options_Values = document.querySelectorAll('.ca_filter_variant_option_inputs');
        var _optionsValues = '';
        var optionvaluesquery = '';
        for(var _oo=0; _oo<_options_Values.length; _oo++)
        {
          if(_options_Values[_oo] != '')
          {
            var _option_Name = _options_Values[_oo].id;
            var option_values = _options_Values[_oo].value;

            if(option_values != '')
            {
              //console.log(option_values);
              var option_values_list = option_values.split(',');
              for(var _O=0; _O<option_values_list.length; _O++)
              {
                if(optionvaluesquery == '')
                {
                  optionvaluesquery = "'" + option_values_list[_O] + "'";
                }
                else
                {
                  optionvaluesquery = optionvaluesquery + " OR " + "'" + option_values_list[_O] + "'";
                }
              }

            }


            if(_optionsValues == '')
            {
              _optionsValues = _option_Name + '_' + _options_Values[_oo].value;
            }
            else
            {
              _optionsValues = _optionsValues + '#' + _option_Name + '_' + _options_Values[_oo].value;
            }
          }

        }

        if(optionvaluesquery != '')
        {
          optionvaluesquery = '(' + optionvaluesquery + ')';
        }
        //console.log(optionvaluesquery);

        // ProductTypeQuery
        var _producttypesList = _producttype.split(',');
        var _producttypequery = '';
        for(var _P=0; _P<_producttypesList.length; _P++)
        {
          if(_producttypequery == '')
          {
            _producttypequery = "'" + _producttypesList[_P] + "'";
          }
          else
          {
            _producttypequery = _producttypequery + " OR " + "'" + _producttypesList[_P] + "'";
          }
        }

        _producttypequery = "(" + _producttypequery + ")";

        if(_producttypequery == "('')")
        {
          _producttypequery = '';
        }
        // VendorQuery
        var _productvendorsList = _vendor.split(',');
        var _productvendorquery = '';
        for(var _V=0; _V<_productvendorsList.length; _V++)
        {
          if(_productvendorquery == '')
          {
            _productvendorquery = "'" + _productvendorsList[_V] + "'";
          }
          else
          {
            _productvendorquery = _productvendorquery + " OR " + "'" + _productvendorsList[_V] + "'";
          }
        }
        _productvendorquery = "(" + _productvendorquery + ")";
        if(_productvendorquery == "('')")
        {
          _productvendorquery = '';
        }
        // Options

        var _filterquery = '';
        if(_producttypequery != '')
        {
          _filterquery = _producttypequery;
        }
        if(_productvendorquery != '')
        {
          if(_filterquery == '')
          {
            _filterquery = _productvendorquery;
          }
          else
          {
            _filterquery = _filterquery + 'AND ' + _productvendorquery;
          }

        }
        if(optionvaluesquery != '')
        {
          _filterquery = _filterquery + 'AND ' + optionvaluesquery;
        }
        /*if(_producttypequery != "('')")
        {
          _filterquery = _producttypequery;
        }

        if(_productvendorquery != "('')")
        {
          if(_producttypequery != "('')")
          {
            _filterquery = _filterquery + ' AND ' + _productvendorquery;
          }
          else
          {
            _filterquery = _productvendorquery;
          }

        }*/
        //_filterquery = "('Sleeveless Top' OR 'Shirts' OR 'Plain Tops' OR 'Striped Tops' OR 'Checked Tops' OR 'Kids Tops' OR 'Baby Tops') AND ('Reddish')";
        var _sortbyarray = getSortByValues(sortby);
        console.log(_filterquery);
        let _filterquerygraphql = `query
                {
                products(first: 12, query:"` + _filterquery + `", sortKey:` + _sortbyarray[0] + `, reverse: ` + _sortbyarray[1] + `) {
                pageInfo
                {
                hasNextPage
                }
                edges {
        node { 
           
          handle
          metafields(first:1, namespace:"judgeme")
          {
            edges
            {
              node
              {
                value
              }
            }
          }
            
        }
      }
                }
                }`;
        //console.log(_filterquerygraphql);
        let storefrontapi_settings_ = {
          'async': true,
          'crossDomain': true,
          'url': 'https://shopthelookdemo.myshopify.com/api/graphql',
          'method': 'POST',
          'dataType': 'json',
          'headers': {
            'X-Shopify-Storefront-Access-Token': 'ee90cada357cda7c419ce03ae75249b9',
            'X-GraphQL-Cost-Include-Fields': 'true',
            'Content-Type': 'application/graphql',
            'Accept': 'application/json'
          },
          'data': _filterquerygraphql
        };
        // Get checkout URL from shopify
        $.ajax(storefrontapi_settings_).done(function (response) {
          console.log(response);
          var _filtethasnextpage = response.data.products.pageInfo.hasNextPage;
          console.log(_filtethasnextpage);
          if(_filtethasnextpage == true)
          {
            $('#ca_paginationbtnnext').show();
          }
          else
          {
            $('#ca_paginationbtnnext').hide();
          }
          var _filteredproducts= response.data.products.edges;
          console.log(_filteredproducts);
          var _filteredproducts = _filteredproducts.slice(0, 8);
          document.getElementById('caf_filterresults_input').value = _filteredproducts;
          //Update Products Grid by JS
          window.result = _filteredproducts;
          var _productstodisplaystring = '';
          
          for(var _r=0; _r<_filteredproducts.length; _r++)
          {
            if(_productstodisplaystring == '')
            {
              _productstodisplaystring = _filteredproducts[_r].node.handle;
            }
            else
            {
              _productstodisplaystring = _productstodisplaystring + ',' + _filteredproducts[_r].node.handle;
            }

          }
          var _filtercount = window.result.length;
          var result = window.result.slice(0, 8);
          console.log(result);
          var _filtersString = '';
          var _filterType = $('#ca_filtervalue_producttype');


          var _productstodisplayArray = _productstodisplaystring.split(',');  
          var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
          document.getElementById('caf_filterresults_url').value = _url_ToLoad;
          _FilterMethodNew_StorefrontAPI_LoadURL(_url_ToLoad);
          /*$.ajax({
            type: "POST",
            dataType: 'json',
            url: "https://" + window.location.hostname  +"/cart/update.js?attributes[caf_filter_products_" + window.collection_handle + "]=" + _productstodisplaystring,             
            success: function(data)
            {
              console.log(data);
              _FilterMethodNew_StorefrontAPI_LoadURL(_url_ToLoad);
            }              

          });*/

//var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring;

             
              /*var _titletext = document.getElementById('ca_filter_bar_text');
          _titletext.innerHTML = _filtercount + ' products found';*/
                     
              //var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
              //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');        
              //var _urltoloadfilter = 'https://' + domainName + '/collections/' + laststring  + '?q=' + _productstodisplaystring;

              //var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
              //var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
              //var _url_ToLoad = window.location.origin + '/search?q=' + _productstodisplaystring;
             
              //var _url_ToLoad = window.location.origin + '/search?q=' + _productstodisplaystring + '&view=cafiltersnolayout';
             
              //$('#caf_filter_button').disabled = false;
              //var filterbutton = document.getElementById('caf_filter_button');
              //filterbutton.style.opacity = '1';
              
              // window.history.replaceState({}, "Cupel Boutique", _url_ToLoad);
              //window.top.location.reload(false);

              /*$("#caf_collectionsgrid").load(_url_ToLoad +" #caf_collectionsgrid>*","", function(responseTxt, statusTxt, xhr){
            _productsgridDiv.style.opacity = '1';
            // secompp quickview
            if ((typeof SCAShopify) !== 'undefined') {
              SCAShopify.jQuery(document).unbind('click.fb-start');
              SCAShopify.loaded = false;
              SCAQVinit = undefined;
              $.getScript($('script[src*="sca-qv-"]').attr('src'));
            }
          });*/
              /*setTimeout(function(){ 
            $.ajax({
              url: _url_ToLoad,
              type: 'GET',
              async: true,
              dataType: 'html', // added data type
              success: function(result) {
                //console.log(res);
                //_html = $.parseHTML(result);
                //console.log(_html);

                //$('.ca_filters_skeletondiv').hide();     

                var containerElement = document.getElementById('caf_collectionsgrid');    
                containerElement.innerHTML = '';

                var newContainer = $(result).find('#caf_collectionsgrid')[0];  
                containerElement.insertAdjacentHTML('beforeend', newContainer.innerHTML);  


                $('script').each(function() {
                  var oldSrc = $(this).attr('src');

                  if(oldSrc != null)
                  {
                    //_Scripttags.push(oldSrc);
                    //oldSrc.includes('starapps')
                    if(oldSrc.includes('wish') || oldSrc.includes('buy-me') 
                       || oldSrc.includes('swatch') || oldSrc.includes('quickview') ||
                       oldSrc.includes('doubly'))
                    {

                      //console.log(oldSrc);
                      // Usage
                      $.cachedScript(oldSrc).done(function(script, textStatus) {
                        //console.log(textStatus);
                      });

                      //$.getScript(oldSrc);
                    }
                  }
                });

                // secompp quickview
                if ((typeof SCAShopify) !== 'undefined') {
                  SCAShopify.jQuery(document).unbind('click.fb-start');
                  SCAShopify.loaded = false;
                  SCAQVinit = undefined;
                  $.getScript($('script[src*="sca-qv-"]').attr('src'));
                }
              }
            });
          }, 20);*/

        });

      }
      
      $("#ca_filter_sortby").change(function(e) {       
      	var selectElement = e.currentTarget;
        var sort_by = selectElement.value;
        _FilterMethodNew_StorefrontAPI_SaveURL(sort_by);
      });

      $('#ca_filterdiv').on('mouseenter', '.rfgrgrg', function (e) {
        //console.log(e);
        document.getElementById('caf_filterresults_url').value = "";
        var _containerElement = e.currentTarget;
        var _filterInput = $(_containerElement).find('input')[0];
        //$(_filterInput).click({filter_element: _filterInput}, filter_function);
        //var filterelement = e.currentTarget;
        var filterelement = _filterInput;
        var classname = filterelement.className;
        var ischecked = $(filterelement).is(':checked');
        var filtervalue = filterelement.id;
        var filteroptionName = filterelement.getAttribute('data-optionname');

        //$('#ca_filterdiv').find('*').prop('disabled', true);

        if (classname.indexOf('ca_filtery_btn') != -1) {

          ischecked = filterelement.getAttribute('data-ischecked');
          if (ischecked == 'true') {
            filterelement.setAttribute('data-ischecked', 'false');
            var innerhtmlstring = filterelement.innerHTML;
            innerhtmlstring = innerhtmlstring.replace('✓', '');
            filterelement.innerHTML = innerhtmlstring;
            //filterelement.style.backgroundColor = '#fff';
            //filterelement.style.color = '#000';
            //filterelement.style.fontSize = '10px';
            ischecked = false;
          }
          else {
            filterelement.setAttribute('data-ischecked', 'true');
            filterelement.innerHTML = '✓' + filterelement.innerHTML;
            /*filterelement.style.backgroundColor = '#EAEAEA';*/
            //filterelement.style.backgroundColor = '#436076';
            //filterelement.style.color = '#fff';
            //filterelement.style.fontSize = '10px';
            ischecked = true;
          }

          if (classname.indexOf('ca_filtery_color_btn') != -1) {
            filterelement.style.color = '#fff';
            filterelement.style.fontSize = '11px';
          }
        }
        if (classname.indexOf('ca_filtery_colorbtn') != -1) {

          ischecked = filterelement.getAttribute('data-ischecked');
          if (ischecked == 'true') {
            filterelement.setAttribute('data-ischecked', 'false');
            var innerhtmlstring = filterelement.innerHTML;
            filterelement.innerHTML = '';
            filterelement.style.border = '';
            ischecked = false;
          }
          else {
            filterelement.setAttribute('data-ischecked', 'true');
            filterelement.innerHTML = '✓';
            filterelement.style.border = '1px solid #EAEAEA';
            ischecked = true;
          }
        }

        var selectedfiltername = filterelement.id;
        var filtername = filterelement.getAttribute('data-filtername');
        // Product Type
        if (filtername == 'ca_filter_producttype') {
          console.log(ischecked);
          var oldproducttype = document.getElementById('ca_filtervalue_producttype').value;
          var typeValue = filterelement.value;
          //typeValue = typeValue.replace(' ', '-');
          if (ischecked == true) {
            if (oldproducttype == '') {
              document.getElementById('ca_filtervalue_producttype').value = typeValue;
            }
            else {
              document.getElementById('ca_filtervalue_producttype').value = oldproducttype + ',' + typeValue;
            }
          }
          else {

            var oldproducttypeList = oldproducttype.split(',');

            var newproducttypeList = oldproducttypeList.removeByVal(selectedfiltername);

            var newproducttypestring = '';
            for (var v = 0; v < newproducttypeList.length; v++) {
              var newTypeValue = newproducttypeList[v];
              //newTypeValue = newTypeValue.replace(' ', '-');
              if (newproducttypestring == '') {
                newproducttypestring = newTypeValue;
              }
              else {
                newproducttypestring = newproducttypestring + "," + newTypeValue;
              }
            }

            document.getElementById('ca_filtervalue_producttype').value = newproducttypestring;
          }


        }
        // Vendor
        //console.log(filtername);
        if (filtername == 'ca_filter_vendor') {
          var oldproductvendor = document.getElementById('ca_filtervalue_vendor').value;
          var vendorValue = filterelement.value;
          //vendorValue = vendorValue.replace(' ', '-');
          if (ischecked == true) {
            if (oldproductvendor == '') {
              document.getElementById('ca_filtervalue_vendor').value = vendorValue;
            }
            else {
              document.getElementById('ca_filtervalue_vendor').value = oldproductvendor + ',' + vendorValue;
            }
          }
          else {
            var oldproductvendorList = oldproductvendor.split(',');
            var newproductvendorList = oldproductvendorList.removeByVal(selectedfiltername);

            var newproductvendorstring = '';
            for (var v = 0; v < newproductvendorList.length; v++) {
              var newVendorValue = newproductvendorList[v];
              //newVendorValue = newVendorValue.replace(' ', '-');
              if (newproductvendorstring == '') {
                newproductvendorstring = newVendorValue;
              }
              else {
                newproductvendorstring = newproductvendorstring + "," + newVendorValue;
              }
            }

            document.getElementById('ca_filtervalue_vendor').value = newproductvendorstring;
          }


        }

        // Option Click
        if (filteroptionName != '' && filteroptionName != null) {
          var oldoption = document.getElementById(filteroptionName).value;

          var optionValue = filterelement.id;
          //optionValue = option1Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption == '') {
              document.getElementById(filteroptionName).value = optionValue;
            }
            else {
              document.getElementById(filteroptionName).value = oldoption + ',' + optionValue;
            }
          }
          else {
            var oldoptionList = oldoption.split(',');
            var newoptionList = oldoptionList.removeByVal(selectedfiltername);

            var newoptionstring = '';
            for (var v = 0; v < newoptionList.length; v++) {
              var newoption = newoptionList[v];
              //newoption = newoption.replace(' ', '-');
              if (newoptionstring == '') {
                newoptionstring = newoption;
              }
              else {
                newoptionstring = newoptionstring + "," + newoption;
              }
            }

            document.getElementById(filteroptionName).value = newoptionstring;
          }


        }

        // Option1
        if (filtername == 'ca_filter_option1') {
          var oldoption1 = document.getElementById('ca_filtervalue_option1').value;

          var option1Value = filterelement.id;
          //option1Value = option1Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption1 == '') {
              document.getElementById('ca_filtervalue_option1').value = option1Value;
            }
            else {
              document.getElementById('ca_filtervalue_option1').value = oldoption1 + ',' + option1Value;
            }
          }
          else {
            var oldoption1List = oldoption1.split(',');
            var newoption1List = oldoption1List.removeByVal(selectedfiltername);

            var newoption1string = '';
            for (var v = 0; v < newoption1List.length; v++) {
              var newoption1 = newoption1List[v];
              //newoption1 = newoption1.replace(' ', '-');
              if (newoption1string == '') {
                newoption1string = newoption1;
              }
              else {
                newoption1string = newoption1string + "," + newoption1;
              }
            }

            document.getElementById('ca_filtervalue_option1').value = newoption1string;
          }


        }

        // Option 2        
        if (filtername == 'ca_filter_option2') {
          var oldoption2 = document.getElementById('ca_filtervalue_option2').value;
          //console.log(ischecked);
          var option2Value = filterelement.id;
          //option2Value = option2Value.replace(' ', '-');
          if (ischecked == true) {
            if (oldoption2 == '') {
              document.getElementById('ca_filtervalue_option2').value = option2Value;
            }
            else {
              document.getElementById('ca_filtervalue_option2').value = oldoption2 + ',' + option2Value;
            }
          }
          else {
            var oldoption2List = oldoption2.split(',');
            var newoption2List = oldoption2List.removeByVal(selectedfiltername);

            var newoption2string = '';
            for (var v = 0; v < newoption2List.length; v++) {
              var newoption2 = newoption2List[v];
              //newoption2 = newoption2.replace(' ', '-');
              if (newoption2string == '') {
                newoption2string = newoption2;
              }
              else {
                newoption2string = newoption2string + "," + newoption2;
              }
            }

            document.getElementById('ca_filtervalue_option2').value = newoption2string;
          }


        }
        // Option 3
        //console.log(filtername);
        if (filtername == 'ca_filter_option3') {

          var oldoption3 = document.getElementById('ca_filtervalue_option3').value;
          var option3Value = filterelement.id;
          //option3Value = option3Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption3 == '') {
              document.getElementById('ca_filtervalue_option3').value = option3Value;
            }
            else {
              document.getElementById('ca_filtervalue_option3').value = oldoption3 + ',' + option3Value;
            }
          }
          else {
            var oldoption3List = oldoption3.split(',');
            var newoption3List = oldoption3List.removeByVal(selectedfiltername);

            var newoption3string = '';
            for (var v = 0; v < newoption3List.length; v++) {
              var newoption3 = newoption3List[v];
              //newoption3 = newoption3.replace(' ', '-');
              if (newoption3string == '') {
                newoption3string = newoption3;
              }
              else {
                newoption3string = newoption3string + "," + newoption3;
              }
            }

            document.getElementById('ca_filtervalue_option3').value = newoption3string;
          }


        }

        // Discount      
        if (filtername == 'ca_filter_discount') {

          var olddiscount = document.getElementById('ca_filtervalue_discount').value;

          var discountStringValue = filterelement.id.replace(/\%/g, '');
          discountStringValue = discountStringValue.replace(/\ /g, '');
          if (ischecked == true) {
            if (olddiscount == '') {

              document.getElementById('ca_filtervalue_discount').value = discountStringValue;
            }
            else {
              document.getElementById('ca_filtervalue_discount').value = olddiscount + ',' + discountStringValue;
            }
          }
          else {
            var olddiscountList = olddiscount.split(',');
            var newdiscountList = olddiscountList.removeByVal(selectedfiltername);

            var newdiscountstring = '';
            for (var v = 0; v < newdiscountList.length; v++) {
              var discountString = newdiscountList[v].replace(/\%/g, '');
              discountString = discountString.replace(/\ /g, '');
              if (newdiscountstring == '') {
                newdiscountstring = discountString;
              }
              else {
                newdiscountstring = newdiscountstring + "," + discountString;
              }
            }

            document.getElementById('ca_filtervalue_discount').value = newdiscountstring;
          }

        }

        // Budget      
        if (filtername == 'ca_filter_budget') {
          var budgetElement = document.getElementById('ca_filtervalue_budget');
          var _budgetfrom = document.getElementById('ca_filtervalue_budgetmin').value;
          var _budgetto = document.getElementById('ca_filtervalue_budgetmin').value;
          var oldbudget = document.getElementById('ca_filtervalue_budget').value;
          var budgetfrom = filterelement.getAttribute('data-budget-from');
          var budgetto = filterelement.getAttribute('data-budget-to');
          var filtervalue = _budgetfrom + "_" + _budgetto;
          document.getElementById('ca_filtervalue_budget').value = filtervalue;
          //console.log(filterelement);
        }

        var _filterType = document.getElementById('ca_filter_type_input').value;
        var _producttype = document.getElementById('ca_filtervalue_producttype').value;
        var _vendor = document.getElementById('ca_filtervalue_vendor').value;
        var _budget = document.getElementById('ca_filtervalue_budget').value;

        var _options_Values = document.querySelectorAll('.ca_filter_variant_option_inputs');
        var _optionsValues = '';
        var optionvaluesquery = '';
        for(var _oo=0; _oo<_options_Values.length; _oo++)
        {
          if(_options_Values[_oo] != '')
          {
            var _option_Name = _options_Values[_oo].id;
            var option_values = _options_Values[_oo].value;

            if(option_values != '')
            {
              //console.log(option_values);
              var option_values_list = option_values.split(',');
              for(var _O=0; _O<option_values_list.length; _O++)
              {
                if(optionvaluesquery == '')
                {
                  optionvaluesquery = "'" + option_values_list[_O] + "'";
                }
                else
                {
                  optionvaluesquery = optionvaluesquery + " OR " + "'" + option_values_list[_O] + "'";
                }
              }

            }


            if(_optionsValues == '')
            {
              _optionsValues = _option_Name + '_' + _options_Values[_oo].value;
            }
            else
            {
              _optionsValues = _optionsValues + '#' + _option_Name + '_' + _options_Values[_oo].value;
            }
          }

        }

        if(optionvaluesquery != '')
        {
          optionvaluesquery = '(' + optionvaluesquery + ')';
        }
        //console.log(optionvaluesquery);

        // ProductTypeQuery
        var _producttypesList = _producttype.split(',');
        var _producttypequery = '';
        for(var _P=0; _P<_producttypesList.length; _P++)
        {
          if(_producttypequery == '')
          {
            _producttypequery = "'" + _producttypesList[_P] + "'";
          }
          else
          {
            _producttypequery = _producttypequery + " OR " + "'" + _producttypesList[_P] + "'";
          }
        }

        _producttypequery = "(" + _producttypequery + ")";

        if(_producttypequery == "('')")
        {
          _producttypequery = '';
        }
        // VendorQuery
        var _productvendorsList = _vendor.split(',');
        var _productvendorquery = '';
        for(var _V=0; _V<_productvendorsList.length; _V++)
        {
          if(_productvendorquery == '')
          {
            _productvendorquery = "'" + _productvendorsList[_V] + "'";
          }
          else
          {
            _productvendorquery = _productvendorquery + " OR " + "'" + _productvendorsList[_V] + "'";
          }
        }
        _productvendorquery = "(" + _productvendorquery + ")";
        if(_productvendorquery == "('')")
        {
          _productvendorquery = '';
        }
        // Options

        var _filterquery = '';
        if(_producttypequery != '')
        {
          _filterquery = _producttypequery;
        }
        if(_productvendorquery != '')
        {
          if(_filterquery == '')
          {
            _filterquery = _productvendorquery;
          }
          else
          {
            _filterquery = _filterquery + 'AND ' + _productvendorquery;
          }

        }
        if(optionvaluesquery != '')
        {
          _filterquery = _filterquery + 'AND ' + optionvaluesquery;
        }
        /*if(_producttypequery != "('')")
        {
          _filterquery = _producttypequery;
        }

        if(_productvendorquery != "('')")
        {
          if(_producttypequery != "('')")
          {
            _filterquery = _filterquery + ' AND ' + _productvendorquery;
          }
          else
          {
            _filterquery = _productvendorquery;
          }

        }*/
        //_filterquery = "('Sleeveless Top' OR 'Shirts' OR 'Plain Tops' OR 'Striped Tops' OR 'Checked Tops' OR 'Kids Tops' OR 'Baby Tops') AND ('Reddish')";
        var _sortbyvalue = $('#ca_filter_sortbyselect').val();
        var _sortbyarray = getSortByValues(_sortbyvalue);
        //console.log(_sortbyarray);
        let _filterquerygraphql = `query
{
products(first: 8, query:"` + _filterquery + `", sortKey:` + _sortbyarray[0] + `, reverse: ` + _sortbyarray[1] + `) {
pageInfo
{
hasNextPage
}
edges {
node {    
handle
}
}
}
}
`;
        //console.log(_filterquerygraphql);
        let storefrontapi_settings_ = {
          'async': true,
          'crossDomain': true,
          'url': 'https://shopthelookdemo.myshopify.com/api/graphql',
          'method': 'POST',
          'dataType': 'json',
          'headers': {
            'X-Shopify-Storefront-Access-Token': 'ee90cada357cda7c419ce03ae75249b9',
            'Content-Type': 'application/graphql',
            'Accept': 'application/json'
          },
          'data': _filterquerygraphql
        };
        // Get checkout URL from shopify
        $.ajax(storefrontapi_settings_).done(function (response) {
          console.log(response);
          var _filteredproducts= response.data.products.edges;
          document.getElementById('caf_filterresults_input').value = _filteredproducts;
          //Update Products Grid by JS
          var result = _filteredproducts;
          var _productstodisplaystring = '';
          for(var _r=0; _r<_filteredproducts.length; _r++)
          {
            if(_productstodisplaystring == '')
            {
              _productstodisplaystring = _filteredproducts[_r].node.handle;
            }
            else
            {
              _productstodisplaystring = _productstodisplaystring + ',' + _filteredproducts[_r].node.handle;
            }

          }
          //var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring;

          var _filtercount = result.length;
          var _titletext = document.getElementById('ca_filter_bar_text');
          _titletext.innerHTML = _filtercount + ' products found';
          var result = result.slice(0, 8);
          var _filtersString = '';
          var _filterType = $('#ca_filtervalue_producttype');


          var _productstodisplayArray = _productstodisplaystring.split(',');         
          //var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
          //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');        
          //var _urltoloadfilter = 'https://' + domainName + '/collections/' + laststring  + '?q=' + _productstodisplaystring;

          //var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
          //var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
          //var _url_ToLoad = window.location.origin + '/search?q=' + _productstodisplaystring;
          var _url_ToLoad = window.location.origin +  window.location.pathname + '?note=' + _productstodisplaystring + '&view=cafiltersnolayout';
          //var _url_ToLoad = window.location.origin + '/search?q=' + _productstodisplaystring + '&view=cafiltersnolayout';
          document.getElementById('caf_filterresults_url').value = _url_ToLoad;
        });
      });

      $('#ca_filterdiv').on('click', '#caf_filter_button', function (e) {
        // console.log(e);
        //_FilterMethodNew_StorefrontAPI_LoadURL();
        var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
        //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');
        _productsgridDiv.style.opacity = '0.5';
        var _url_toload = document.getElementById('caf_filterresults_url').value;
       
        $("#caf_collectionsgrid").load(_url_toload +" #caf_collectionsgrid>*","", function(responseTxt, statusTxt, xhr){
          _productsgridDiv.style.opacity = '1';
          // secompp quickview
          if ((typeof SCAShopify) !== 'undefined') {
            SCAShopify.jQuery(document).unbind('click.fb-start');
            SCAShopify.loaded = false;
            SCAQVinit = undefined;
            $.getScript($('script[src*="sca-qv-"]').attr('src'));
          }
        });
      });
      /*$('#ca_filterdiv').on('mouseenter', '.ca_filtery_checkbox', function (e) {
        console.log(e);
      });*/

      $('#ca_filterdiv').on('click', '.ca_filtery_checkbox', function (e) {
        var _filter_URL = document.getElementById('caf_filterresults_url').value;
      });

      $('#ca_filterdiv').on('click', '.ca_filtery_checkbox', function (e) {

        var _productsgridDiv = document.querySelectorAll('.grid.grid--uniform.grid--view-items')[0];
        //var _skeletondiv = document.getElementById('ca_filters_skeletondiv');
        _productsgridDiv.style.opacity = '0.5';
        /*var _currentelement = e.currentTarget;
        console.log(_currentelement);
        var _fitlerElement = $(_currentelement).find('input')[0];
        console.log(_fitlerElement);*/
        //var filterbutton = document.getElementById('caf_filter_button');
        //filterbutton.style.opacity = '0.5';
        //$('#caf_filter_button').disabled = true;
        //$('#ca_filter_loaderspinner').show();
        //$('#collectionsgrid')[0].style.opacity = 0.5;
        //var filterelement = e.currentTarget;
        var filterelement = e.currentTarget;
        var classname = filterelement.className;
        var ischecked = $(filterelement).is(':checked');
        var filtervalue = filterelement.id;
        var filteroptionName = filterelement.getAttribute('data-optionname');

        //$('#ca_filterdiv').find('*').prop('disabled', true);

        if (classname.indexOf('ca_filtery_btn') != -1) {

          ischecked = filterelement.getAttribute('data-ischecked');
          if (ischecked == 'true') {
            filterelement.setAttribute('data-ischecked', 'false');
            var innerhtmlstring = filterelement.innerHTML;
            innerhtmlstring = innerhtmlstring.replace('✓', '');
            filterelement.innerHTML = innerhtmlstring;
            //filterelement.style.backgroundColor = '#fff';
            //filterelement.style.color = '#000';
            //filterelement.style.fontSize = '10px';
            ischecked = false;
          }
          else {
            filterelement.setAttribute('data-ischecked', 'true');
            filterelement.innerHTML = '✓' + filterelement.innerHTML;
            /*filterelement.style.backgroundColor = '#EAEAEA';*/
            //filterelement.style.backgroundColor = '#436076';
            //filterelement.style.color = '#fff';
            //filterelement.style.fontSize = '10px';
            ischecked = true;
          }

          if (classname.indexOf('ca_filtery_color_btn') != -1) {
            filterelement.style.color = '#fff';
            filterelement.style.fontSize = '11px';
          }
        }
        if (classname.indexOf('ca_filtery_colorbtn') != -1) {

          ischecked = filterelement.getAttribute('data-ischecked');
          if (ischecked == 'true') {
            filterelement.setAttribute('data-ischecked', 'false');
            var innerhtmlstring = filterelement.innerHTML;
            filterelement.innerHTML = '';
            filterelement.style.border = '';
            ischecked = false;
          }
          else {
            filterelement.setAttribute('data-ischecked', 'true');
            filterelement.innerHTML = '✓';
            filterelement.style.border = '1px solid #EAEAEA';
            ischecked = true;
          }
        }

        var selectedfiltername = filterelement.id;
        var filtername = filterelement.getAttribute('data-filtername');
        // Product Type
        if (filtername == 'ca_filter_producttype') {
          var oldproducttype = document.getElementById('ca_filtervalue_producttype').value;
          var typeValue = filterelement.value;
          //typeValue = typeValue.replace(' ', '-');
          if (ischecked == true) {
            if (oldproducttype == '') {
              document.getElementById('ca_filtervalue_producttype').value = typeValue;
            }
            else {
              document.getElementById('ca_filtervalue_producttype').value = oldproducttype + ',' + typeValue;
            }
          }
          else {

            var oldproducttypeList = oldproducttype.split(',');

            var newproducttypeList = oldproducttypeList.removeByVal(selectedfiltername);

            var newproducttypestring = '';
            for (var v = 0; v < newproducttypeList.length; v++) {
              var newTypeValue = newproducttypeList[v];
              //newTypeValue = newTypeValue.replace(' ', '-');
              if (newproducttypestring == '') {
                newproducttypestring = newTypeValue;
              }
              else {
                newproducttypestring = newproducttypestring + "," + newTypeValue;
              }
            }

            document.getElementById('ca_filtervalue_producttype').value = newproducttypestring;
          }


        }
        // Vendor
        console.log(filtername);
        if (filtername == 'ca_filter_vendor') {
          var oldproductvendor = document.getElementById('ca_filtervalue_vendor').value;
          var vendorValue = filterelement.value;
          //vendorValue = vendorValue.replace(' ', '-');
          if (ischecked == true) {
            if (oldproductvendor == '') {
              document.getElementById('ca_filtervalue_vendor').value = vendorValue;
            }
            else {
              document.getElementById('ca_filtervalue_vendor').value = oldproductvendor + ',' + vendorValue;
            }
          }
          else {
            var oldproductvendorList = oldproductvendor.split(',');
            var newproductvendorList = oldproductvendorList.removeByVal(selectedfiltername);

            var newproductvendorstring = '';
            for (var v = 0; v < newproductvendorList.length; v++) {
              var newVendorValue = newproductvendorList[v];
              //newVendorValue = newVendorValue.replace(' ', '-');
              if (newproductvendorstring == '') {
                newproductvendorstring = newVendorValue;
              }
              else {
                newproductvendorstring = newproductvendorstring + "," + newVendorValue;
              }
            }

            document.getElementById('ca_filtervalue_vendor').value = newproductvendorstring;
          }


        }

        // Option Click
        if (filteroptionName != '' && filteroptionName != null) {
          var oldoption = document.getElementById(filteroptionName).value;

          var optionValue = filterelement.id;
          //optionValue = option1Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption == '') {
              document.getElementById(filteroptionName).value = optionValue;
            }
            else {
              document.getElementById(filteroptionName).value = oldoption + ',' + optionValue;
            }
          }
          else {
            var oldoptionList = oldoption.split(',');
            var newoptionList = oldoptionList.removeByVal(selectedfiltername);

            var newoptionstring = '';
            for (var v = 0; v < newoptionList.length; v++) {
              var newoption = newoptionList[v];
              //newoption = newoption.replace(' ', '-');
              if (newoptionstring == '') {
                newoptionstring = newoption;
              }
              else {
                newoptionstring = newoptionstring + "," + newoption;
              }
            }

            document.getElementById(filteroptionName).value = newoptionstring;
          }


        }

        // Option1
        if (filtername == 'ca_filter_option1') {
          var oldoption1 = document.getElementById('ca_filtervalue_option1').value;

          var option1Value = filterelement.id;
          //option1Value = option1Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption1 == '') {
              document.getElementById('ca_filtervalue_option1').value = option1Value;
            }
            else {
              document.getElementById('ca_filtervalue_option1').value = oldoption1 + ',' + option1Value;
            }
          }
          else {
            var oldoption1List = oldoption1.split(',');
            var newoption1List = oldoption1List.removeByVal(selectedfiltername);

            var newoption1string = '';
            for (var v = 0; v < newoption1List.length; v++) {
              var newoption1 = newoption1List[v];
              //newoption1 = newoption1.replace(' ', '-');
              if (newoption1string == '') {
                newoption1string = newoption1;
              }
              else {
                newoption1string = newoption1string + "," + newoption1;
              }
            }

            document.getElementById('ca_filtervalue_option1').value = newoption1string;
          }


        }

        // Option 2        
        if (filtername == 'ca_filter_option2') {
          var oldoption2 = document.getElementById('ca_filtervalue_option2').value;
          //console.log(ischecked);
          var option2Value = filterelement.id;
          //option2Value = option2Value.replace(' ', '-');
          if (ischecked == true) {
            if (oldoption2 == '') {
              document.getElementById('ca_filtervalue_option2').value = option2Value;
            }
            else {
              document.getElementById('ca_filtervalue_option2').value = oldoption2 + ',' + option2Value;
            }
          }
          else {
            var oldoption2List = oldoption2.split(',');
            var newoption2List = oldoption2List.removeByVal(selectedfiltername);

            var newoption2string = '';
            for (var v = 0; v < newoption2List.length; v++) {
              var newoption2 = newoption2List[v];
              //newoption2 = newoption2.replace(' ', '-');
              if (newoption2string == '') {
                newoption2string = newoption2;
              }
              else {
                newoption2string = newoption2string + "," + newoption2;
              }
            }

            document.getElementById('ca_filtervalue_option2').value = newoption2string;
          }


        }
        // Option 3
        //console.log(filtername);
        if (filtername == 'ca_filter_option3') {

          var oldoption3 = document.getElementById('ca_filtervalue_option3').value;
          var option3Value = filterelement.id;
          //option3Value = option3Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption3 == '') {
              document.getElementById('ca_filtervalue_option3').value = option3Value;
            }
            else {
              document.getElementById('ca_filtervalue_option3').value = oldoption3 + ',' + option3Value;
            }
          }
          else {
            var oldoption3List = oldoption3.split(',');
            var newoption3List = oldoption3List.removeByVal(selectedfiltername);

            var newoption3string = '';
            for (var v = 0; v < newoption3List.length; v++) {
              var newoption3 = newoption3List[v];
              //newoption3 = newoption3.replace(' ', '-');
              if (newoption3string == '') {
                newoption3string = newoption3;
              }
              else {
                newoption3string = newoption3string + "," + newoption3;
              }
            }

            document.getElementById('ca_filtervalue_option3').value = newoption3string;
          }


        }

        // Discount      
        if (filtername == 'ca_filter_discount') {

          var olddiscount = document.getElementById('ca_filtervalue_discount').value;

          var discountStringValue = filterelement.id.replace(/\%/g, '');
          discountStringValue = discountStringValue.replace(/\ /g, '');
          if (ischecked == true) {
            if (olddiscount == '') {

              document.getElementById('ca_filtervalue_discount').value = discountStringValue;
            }
            else {
              document.getElementById('ca_filtervalue_discount').value = olddiscount + ',' + discountStringValue;
            }
          }
          else {
            var olddiscountList = olddiscount.split(',');
            var newdiscountList = olddiscountList.removeByVal(selectedfiltername);

            var newdiscountstring = '';
            for (var v = 0; v < newdiscountList.length; v++) {
              var discountString = newdiscountList[v].replace(/\%/g, '');
              discountString = discountString.replace(/\ /g, '');
              if (newdiscountstring == '') {
                newdiscountstring = discountString;
              }
              else {
                newdiscountstring = newdiscountstring + "," + discountString;
              }
            }

            document.getElementById('ca_filtervalue_discount').value = newdiscountstring;
          }

        }

        // Budget      
        if (filtername == 'ca_filter_budget') {
          var budgetElement = document.getElementById('ca_filtervalue_budget');
          var _budgetfrom = document.getElementById('ca_filtervalue_budgetmin').value;
          var _budgetto = document.getElementById('ca_filtervalue_budgetmin').value;
          var oldbudget = document.getElementById('ca_filtervalue_budget').value;
          var budgetfrom = filterelement.getAttribute('data-budget-from');
          var budgetto = filterelement.getAttribute('data-budget-to');
          var filtervalue = _budgetfrom + "_" + _budgetto;
          document.getElementById('ca_filtervalue_budget').value = filtervalue;
          //console.log(filterelement);
        }

        
       
        var _filterType = document.getElementById('ca_filter_type_input').value;
        if(_filterType == 'Vertical' || _filterType == 'Horizontal')
        {
          //console.log(_filterType);
          //_FilterMethodNew();
          //_FilterMethodNew_StorefrontAPI();
          _FilterMethodNew_StorefrontAPI_SaveURL('title-ascending');
        }


      });

      $( ".ca_filter_container").hover(function(event) {
        console.log(event.currentTarget);
      });
  
      $('#ca_filterdiv').on('hover', '.ca_filtery_checkbox', function (e) {

         console.log(e.currentTarget);
        /*var _currentelement = e.currentTarget;
        console.log(_currentelement);
        var _fitlerElement = $(_currentelement).find('input')[0];
        console.log(_fitlerElement);*/
        //var filterbutton = document.getElementById('caf_filter_button');
        //filterbutton.style.opacity = '0.5';
        //$('#caf_filter_button').disabled = true;
        //$('#ca_filter_loaderspinner').show();
        //$('#collectionsgrid')[0].style.opacity = 0.5;
        //var filterelement = e.currentTarget;
        var filterelement = e.currentTarget;
        var classname = filterelement.className;
        var ischecked = $(filterelement).is(':checked');
        var filtervalue = filterelement.id;
        var filteroptionName = filterelement.getAttribute('data-optionname');

        //$('#ca_filterdiv').find('*').prop('disabled', true);

        if (classname.indexOf('ca_filtery_btn') != -1) {

          ischecked = filterelement.getAttribute('data-ischecked');
          if (ischecked == 'true') {
            filterelement.setAttribute('data-ischecked', 'false');
            var innerhtmlstring = filterelement.innerHTML;
            innerhtmlstring = innerhtmlstring.replace('✓', '');
            filterelement.innerHTML = innerhtmlstring;
            //filterelement.style.backgroundColor = '#fff';
            //filterelement.style.color = '#000';
            //filterelement.style.fontSize = '10px';
            ischecked = false;
          }
          else {
            filterelement.setAttribute('data-ischecked', 'true');
            filterelement.innerHTML = '✓' + filterelement.innerHTML;
            /*filterelement.style.backgroundColor = '#EAEAEA';*/
            //filterelement.style.backgroundColor = '#436076';
            //filterelement.style.color = '#fff';
            //filterelement.style.fontSize = '10px';
            ischecked = true;
          }

          if (classname.indexOf('ca_filtery_color_btn') != -1) {
            filterelement.style.color = '#fff';
            filterelement.style.fontSize = '11px';
          }
        }
        if (classname.indexOf('ca_filtery_colorbtn') != -1) {

          ischecked = filterelement.getAttribute('data-ischecked');
          if (ischecked == 'true') {
            filterelement.setAttribute('data-ischecked', 'false');
            var innerhtmlstring = filterelement.innerHTML;
            filterelement.innerHTML = '';
            filterelement.style.border = '';
            ischecked = false;
          }
          else {
            filterelement.setAttribute('data-ischecked', 'true');
            filterelement.innerHTML = '✓';
            filterelement.style.border = '1px solid #EAEAEA';
            ischecked = true;
          }
        }

        var selectedfiltername = filterelement.id;
        var filtername = filterelement.getAttribute('data-filtername');
        // Product Type
        if (filtername == 'ca_filter_producttype') {
          var oldproducttype = document.getElementById('ca_filtervalue_producttype').value;
          var typeValue = filterelement.value;
          //typeValue = typeValue.replace(' ', '-');
          if (ischecked == true) {
            if (oldproducttype == '') {
              document.getElementById('ca_filtervalue_producttype').value = typeValue;
            }
            else {
              document.getElementById('ca_filtervalue_producttype').value = oldproducttype + ',' + typeValue;
            }
          }
          else {

            var oldproducttypeList = oldproducttype.split(',');

            var newproducttypeList = oldproducttypeList.removeByVal(selectedfiltername);

            var newproducttypestring = '';
            for (var v = 0; v < newproducttypeList.length; v++) {
              var newTypeValue = newproducttypeList[v];
              //newTypeValue = newTypeValue.replace(' ', '-');
              if (newproducttypestring == '') {
                newproducttypestring = newTypeValue;
              }
              else {
                newproducttypestring = newproducttypestring + "," + newTypeValue;
              }
            }

            document.getElementById('ca_filtervalue_producttype').value = newproducttypestring;
          }


        }
        // Vendor
        console.log(filtername);
        if (filtername == 'ca_filter_vendor') {
          var oldproductvendor = document.getElementById('ca_filtervalue_vendor').value;
          var vendorValue = filterelement.value;
          //vendorValue = vendorValue.replace(' ', '-');
          if (ischecked == true) {
            if (oldproductvendor == '') {
              document.getElementById('ca_filtervalue_vendor').value = vendorValue;
            }
            else {
              document.getElementById('ca_filtervalue_vendor').value = oldproductvendor + ',' + vendorValue;
            }
          }
          else {
            var oldproductvendorList = oldproductvendor.split(',');
            var newproductvendorList = oldproductvendorList.removeByVal(selectedfiltername);

            var newproductvendorstring = '';
            for (var v = 0; v < newproductvendorList.length; v++) {
              var newVendorValue = newproductvendorList[v];
              //newVendorValue = newVendorValue.replace(' ', '-');
              if (newproductvendorstring == '') {
                newproductvendorstring = newVendorValue;
              }
              else {
                newproductvendorstring = newproductvendorstring + "," + newVendorValue;
              }
            }

            document.getElementById('ca_filtervalue_vendor').value = newproductvendorstring;
          }


        }

        // Option Click
        if (filteroptionName != '' && filteroptionName != null) {
          var oldoption = document.getElementById(filteroptionName).value;

          var optionValue = filterelement.id;
          //optionValue = option1Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption == '') {
              document.getElementById(filteroptionName).value = optionValue;
            }
            else {
              document.getElementById(filteroptionName).value = oldoption + ',' + optionValue;
            }
          }
          else {
            var oldoptionList = oldoption.split(',');
            var newoptionList = oldoptionList.removeByVal(selectedfiltername);

            var newoptionstring = '';
            for (var v = 0; v < newoptionList.length; v++) {
              var newoption = newoptionList[v];
              //newoption = newoption.replace(' ', '-');
              if (newoptionstring == '') {
                newoptionstring = newoption;
              }
              else {
                newoptionstring = newoptionstring + "," + newoption;
              }
            }

            document.getElementById(filteroptionName).value = newoptionstring;
          }


        }

        // Option1
        if (filtername == 'ca_filter_option1') {
          var oldoption1 = document.getElementById('ca_filtervalue_option1').value;

          var option1Value = filterelement.id;
          //option1Value = option1Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption1 == '') {
              document.getElementById('ca_filtervalue_option1').value = option1Value;
            }
            else {
              document.getElementById('ca_filtervalue_option1').value = oldoption1 + ',' + option1Value;
            }
          }
          else {
            var oldoption1List = oldoption1.split(',');
            var newoption1List = oldoption1List.removeByVal(selectedfiltername);

            var newoption1string = '';
            for (var v = 0; v < newoption1List.length; v++) {
              var newoption1 = newoption1List[v];
              //newoption1 = newoption1.replace(' ', '-');
              if (newoption1string == '') {
                newoption1string = newoption1;
              }
              else {
                newoption1string = newoption1string + "," + newoption1;
              }
            }

            document.getElementById('ca_filtervalue_option1').value = newoption1string;
          }


        }

        // Option 2        
        if (filtername == 'ca_filter_option2') {
          var oldoption2 = document.getElementById('ca_filtervalue_option2').value;
          //console.log(ischecked);
          var option2Value = filterelement.id;
          //option2Value = option2Value.replace(' ', '-');
          if (ischecked == true) {
            if (oldoption2 == '') {
              document.getElementById('ca_filtervalue_option2').value = option2Value;
            }
            else {
              document.getElementById('ca_filtervalue_option2').value = oldoption2 + ',' + option2Value;
            }
          }
          else {
            var oldoption2List = oldoption2.split(',');
            var newoption2List = oldoption2List.removeByVal(selectedfiltername);

            var newoption2string = '';
            for (var v = 0; v < newoption2List.length; v++) {
              var newoption2 = newoption2List[v];
              //newoption2 = newoption2.replace(' ', '-');
              if (newoption2string == '') {
                newoption2string = newoption2;
              }
              else {
                newoption2string = newoption2string + "," + newoption2;
              }
            }

            document.getElementById('ca_filtervalue_option2').value = newoption2string;
          }


        }
        // Option 3
        //console.log(filtername);
        if (filtername == 'ca_filter_option3') {

          var oldoption3 = document.getElementById('ca_filtervalue_option3').value;
          var option3Value = filterelement.id;
          //option3Value = option3Value.replace(' ', '-');

          if (ischecked == true) {
            if (oldoption3 == '') {
              document.getElementById('ca_filtervalue_option3').value = option3Value;
            }
            else {
              document.getElementById('ca_filtervalue_option3').value = oldoption3 + ',' + option3Value;
            }
          }
          else {
            var oldoption3List = oldoption3.split(',');
            var newoption3List = oldoption3List.removeByVal(selectedfiltername);

            var newoption3string = '';
            for (var v = 0; v < newoption3List.length; v++) {
              var newoption3 = newoption3List[v];
              //newoption3 = newoption3.replace(' ', '-');
              if (newoption3string == '') {
                newoption3string = newoption3;
              }
              else {
                newoption3string = newoption3string + "," + newoption3;
              }
            }

            document.getElementById('ca_filtervalue_option3').value = newoption3string;
          }


        }

        // Discount      
        if (filtername == 'ca_filter_discount') {

          var olddiscount = document.getElementById('ca_filtervalue_discount').value;

          var discountStringValue = filterelement.id.replace(/\%/g, '');
          discountStringValue = discountStringValue.replace(/\ /g, '');
          if (ischecked == true) {
            if (olddiscount == '') {

              document.getElementById('ca_filtervalue_discount').value = discountStringValue;
            }
            else {
              document.getElementById('ca_filtervalue_discount').value = olddiscount + ',' + discountStringValue;
            }
          }
          else {
            var olddiscountList = olddiscount.split(',');
            var newdiscountList = olddiscountList.removeByVal(selectedfiltername);

            var newdiscountstring = '';
            for (var v = 0; v < newdiscountList.length; v++) {
              var discountString = newdiscountList[v].replace(/\%/g, '');
              discountString = discountString.replace(/\ /g, '');
              if (newdiscountstring == '') {
                newdiscountstring = discountString;
              }
              else {
                newdiscountstring = newdiscountstring + "," + discountString;
              }
            }

            document.getElementById('ca_filtervalue_discount').value = newdiscountstring;
          }

        }

        // Budget      
        if (filtername == 'ca_filter_budget') {
          var budgetElement = document.getElementById('ca_filtervalue_budget');
          var _budgetfrom = document.getElementById('ca_filtervalue_budgetmin').value;
          var _budgetto = document.getElementById('ca_filtervalue_budgetmin').value;
          var oldbudget = document.getElementById('ca_filtervalue_budget').value;
          var budgetfrom = filterelement.getAttribute('data-budget-from');
          var budgetto = filterelement.getAttribute('data-budget-to');
          var filtervalue = _budgetfrom + "_" + _budgetto;
          document.getElementById('ca_filtervalue_budget').value = filtervalue;
          //console.log(filterelement);
        }

        var _filterType = document.getElementById('ca_filter_type_input').value;
        if(_filterType == 'Vertical' || _filterType == 'Horizontal')
        {
          //console.log(_filterType);
          //_FilterMethodNew();
          //_FilterMethodNew_StorefrontAPI();
          _FilterMethodNew_StorefrontAPI_SaveURL('title-ascending');
        }


      });
      $('#ca_filter_sortbyselect').on('change', function() {
        //alert( this.value );
        //Filter_Function(, );
        _FilterMethodNew_StorefrontAPI_SaveURL(this.value);
      });
    });


  };

  /* If jQuery has not yet been loaded or if it has but it's too old for our needs,
          we will load jQuery from the Google CDN, and when it's fully loaded, we will run
          our app's JavaScript. Set your own limits here, the sample's code below uses 1.9.1
          as the minimum version we are ready to use, and if the jQuery is older, we load 1.9.1 */
  if ((typeof jQuery === 'undefined') || (parseInt(jQuery.fn.jquery) === 1 && parseFloat(jQuery.fn.jquery.replace(/^1\./, "")) < 9.1)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
      jQuery191 = jQuery.noConflict(true);
      myAppJavaScript(jQuery191);
    });
  } else {
    myAppJavaScript(jQuery);
  }

})();
