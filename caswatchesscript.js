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

    $(document).ready(function () {
      var DomainName = window.location.hostname;
      DomainName = DomainName.replace('www.', '');
      //DomainName = DomainName.replace('.com', '');
      //DomainName = 'mimishdesigns.com';
      var _shopname = Shopify.shop;
      var _hostname = window.location.hostname;
      _shopname = _shopname.replace('.myshopify.com', '');
      var collectionpagestring = pathslist[pathslist.length - 2];
      var _iscollectionpage = 'false';
      laststring = laststring.split('?')[0];
      if (collectionpagestring == 'collections' || laststring == 'search' || laststring == '' || pathslist[2] == _hostname) {
        _iscollectionpage = 'true';
      }
      if (collectionpagestring != 'collections') {
        var correctcollectionstring = pathslist[pathslist.length - 3];
        if (correctcollectionstring == 'collections' || laststring == 'search' || laststring == '') {
          _iscollectionpage = 'true';
        }
      }

      $.get("https://autocolorswatches.apphb.com/Api/SwatchAppVariables/GetVariables?DomainName=" + DomainName, function (appvariables) {
        console.log(appvariables);
        var correctcolorselect = '';
        if (_iscollectionpage == 'true' || _iscollectionpage == true) 
        {
          var allatags = document.querySelectorAll('a');
          var swatchydivs = document.querySelectorAll('.swatch_swatchdiv');
          for (var s = 0; s < swatchydivs.length; s++) {
            swatchydivs[s].style.display = 'inline-block';
          }
          var url = window.location.href;
          var parametervalue = getParameterByName('page');
          if (parametervalue == null) {
            parametervalue = 1;
          }

          var productsincollection = [];
          var correctatags = [];
          for (var a = 0; a < allatags.length; a++) {
            var ataghref = allatags[a].href;
            //if (ataghref.includes('products')) {
            if (ataghref.indexOf('products') > -1) {
              var ataghreflist = ataghref.split('/');
              var producthandle = ataghreflist[ataghreflist.length - 1];
              //productsincollection.push({ url: 'https://' + window.location.hostname + '/products/' + producthandle + '.json' });
              correctatags.push(allatags[a]);
            }
          }
          if (DomainName == "rynoxgears.com") {
            appvariables.SwatchType = "HexColorCode";
          }

          var swatchcolorelements = document.querySelectorAll('.swatchy_colordiv');
          for (s = 0; s < swatchcolorelements.length; s++) {
            swatchcolorelements[s].style.width = appvariables.Swatch_Size + 'px';
            swatchcolorelements[s].style.height = appvariables.Swatch_Size + 'px';
            swatchcolorelements[s].style.lineHeight = appvariables.Swatch_Size + 'px';
            swatchcolorelements[s].style.marginRight = '7px';
            swatchcolorelements[s].style.verticalAlign = 'middle';
            swatchcolorelements[s].style.backgroundClip = 'content-box';
            //swatchcolorelements[s].style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
            if (appvariables.Swatch_IsCircular == "True") {
              swatchcolorelements[s].style.borderRadius = '50%';
              //_parentElement.style.borderRadius = '50%';

            }
            else {
              swatchcolorelements[s].style.borderRadius = '2px';
              //_parentElement.style.borderRadius = '2px';
            }

            //console.log(swatchyp_swatchtype);
            if (appvariables.SwatchType == 'ImageSwatch') {
              //swatchcolorelements[s].style.borderRadius = '50%';
              swatchcolorelements[s].style.backgroundSize = 'cover';
              /*margin-right: 5px; object-fit: cover; width: 30px; height: 30px; display: inline-block; background-image: url('{{ VariantImageArray[indexvalue] }}'); background-repeat: no-repeat; background-position: 50% 50%;*/
            }
            if (appvariables.SwatchType == 'PatchExtractSwatch') {

            }
            if (appvariables.SwatchType == 'HexColorCode') {

              var colorcodes = appvariables.Swatch_SolidColors;
              var colorcodeslist = '';
              // Special Case for Sierrasocks
              if (DomainName == 'sierrasocks.com') {
                colorcodeslist = colorcodes.split('!');
              }
              else {
                colorcodeslist = colorcodes.split(',');
              }
              var _colorname = swatchcolorelements[s].getAttribute('swatchy-data-color');

              for (var c = 0; c < colorcodeslist.length; c++) {
                var colorname = colorcodeslist[c].split('_')[0];
                colorname = colorname.replace('andsymbol', '&');
                colorname = colorname.replace('plussymbol', '+');
                colorname = colorname.replace('commasymbol', ',');
                colorname = colorname.replace('slashsymbol', '/');
                //colorname = colorname.replace(/spacesymbol/g, ' ');
                //colorname = colorname.replace(/hypensymbol/g, '-');
                var colorvaluesstring = colorcodeslist[c].split('_')[1];
                var colorvaluesList;
                var colorvalue1 = '';
                var colorvalue2 = '';
                var colorvalue3 = '';
                if (colorvaluesstring != undefined) {
                  colorvaluesList = colorvaluesstring.split('*');
                  colorvalue1 = colorvaluesList[0];
                  colorvalue2 = colorvaluesList[1];
                  colorvalue3 = colorvaluesList[2];
                }


                //console.log(_colorname + ',' + colorname + ',' + colorvalue);
                if (_colorname == colorname) {
                  //console.log(colorname);
                  //console.log(colorvalue1);
                  //console.log(colorvalue2);
                  //console.log(colorvalue3);
                  swatchcolorelements[s].style.backgroundImage = 'none';
                  if ((colorvalue2 == 'FFFFFF' && colorvalue3 == 'FFFFFF') || (colorvalue2 == undefined && colorvalue3 == undefined) || (colorvalue2 == '' && colorvalue3 == '')) {
                    swatchcolorelements[s].style.backgroundColor = '#' + colorvalue1;
                  }
                  if (colorvalue2 == 'FFFFFF' || colorvalue2 == undefined || colorvalue2 == '') {
                    swatchcolorelements[s].style.backgroundColor = '#' + colorvalue1;
                  }
                  else {
                    if (colorvalue3 == 'FFFFFF' || colorvalue3 == undefined || colorvalue3 == '') {
                      //swatchcolorelements[s].style.borderBottom = swatchSizeTriple + 'px solid #' + colorvalue1;
                      //swatchcolorelements[s].style.backgroundColor = swatchSizeTriple + 'px solid #' + colorvalue2;
                      //swatchcolorelements[s].style.borderTop = swatchSizeTriple + 'px solid #' + colorvalue3;
                      //console.log('linear-gradient( -180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 49%, #' + colorvalue2 + ' 49%, #' + colorvalue2 + ' 51%, #' + colorvalue3 + ' 51% )');
                      swatchcolorelements[s].style.background = 'linear-gradient(-180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 49%, #ffffff 49%, #ffffff 49%, #' + colorvalue2 + ' 51%)';

                    }
                    else {
                      //swatchcolorelements[s].style.borderBottom = swatchSizeDouble + 'px solid #' + colorvalue1;
                      //swatchcolorelements[s].style.backgroundColor = '#' + colorvalue2;
                      //swatchcolorelements[s].style.borderTop = '#' + colorvalue3;
                      swatchcolorelements[s].style.background = 'linear-gradient(-180deg, ' + colorvalue1 + ', #' + colorvalue1 + ' 30%, #' + colorvalue2 + ' 25%, #' + colorvalue2 + ' 55%, #' + colorvalue3 + ' 55%)';

                    }
                  }

                  if (colorvalue3 == 'FFFFFF' || colorvalue3 == undefined || colorvalue3 == '') {

                  }
                  else {
                    //swatchcolorelements[s].style.borderBottom = swatchSizeTriple + 'px solid #' + colorvalue1;
                    //swatchcolorelements[s].style.backgroundColor = swatchSizeTriple + 'px solid #' + colorvalue2;
                    //swatchcolorelements[s].style.borderTop = swatchSizeTriple + 'px solid #' + colorvalue3;
                    //console.log('linear-gradient( -180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 49%, #' + colorvalue2 + ' 49%, #' + colorvalue2 + ' 51%, #' + colorvalue3 + ' 51% )');
                    swatchcolorelements[s].style.background = 'linear-gradient(-180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 30%, #' + colorvalue2 + ' 25%, #' + colorvalue2 + ' 55%, #' + colorvalue3 + ' 55%)';
                  }


                }
              }

            }

            if (DomainName == "rynoxgears.com") {
              swatchcolorelements[s].style.border = '1px solid #000!important';

            }
          }
          var alltags = document.querySelectorAll('a');
          for (a = 0; a < alltags.length; a++) {
            var ahref = alltags[a].href;
            //if (ahref.includes('products')) {
            if (ahref.indexOf('products') > -1) {
              var imageELements = $(alltags[a]).find('img');
              for (var i = 0; i < imageELements.length; i++) {
                imageELements[i].style.objectFit = 'contain';
              }
            }

          }

          $('.swatchy_colordiv').click(function (e) {
            var swatchdiv = e.currentTarget;
            var parentElement = swatchdiv.parentElement;
            var allswatches = parentElement.children;
            //var allswatches = document.querySelectorAll('.swatchy_colordiv');
            for (var a = 0; a < allswatches.length; a++) {
              allswatches[a].style.border = 'none';
              allswatches[a].style.boxShadow = 'none';
              allswatches[a].style.width = (appvariables.Swatch_Size * 1) + 'px';
              allswatches[a].style.height = (appvariables.Swatch_Size * 1) + 'px';
              //allswatches[a].style.lineHeight = (appvariables.Swatch_Size * 1) + 'px';
              allswatches[a].style.padding = '0px';
            }
            swatchdiv.style.backgroundClip = 'content-box';
            swatchdiv.style.padding = '3px';
            swatchdiv.style.width = (appvariables.Swatch_Size * 1) + 2 + 'px';
            swatchdiv.style.height = (appvariables.Swatch_Size * 1) + 2 + 'px';
            swatchdiv.style.boxShadow = '0px 0px 0px ' + appvariables.Swatch_HighlightThickness + 'px #' + appvariables.Swatch_HighlightColor;
            var producturl = swatchdiv.getAttribute('swatchy-data-href');
            var imagesrc = swatchdiv.getAttribute('swatchy-data-variantimage');
            var producthandleList = producturl.split('/');
            var producthandle = producthandleList[2];
            swatchdiv.style.border = '1px solid #eaeaea';
            var allatags = document.querySelectorAll('a');
            var variantid = swatchdiv.getAttribute('swatchy-data-variantid');
            var productimagediv = '';
            var swatchParent = swatchdiv.parentElement;
            //console.log(swatchParent);

            if (DomainName == 'refinedwears.com') {


              var _prevElement1 = swatchParent.parentElement;
              //console.log(_prevElement1);
              var _prevElement2 = _prevElement1.parentElement;
              //console.log(_prevElement2);
              var _prevElement3 = _prevElement2.parentElement;
              prevElement = _prevElement3.parentElement;
              //console.log(prevElement);
              //var prevElement = $(swatchParent).prev();
              var imageElements = $(prevElement).find('img');
              //console.log(imageElements);
              var allimages = document.querySelectorAll('img');
              productimagediv = imageElements[0];
              //console.log(productimagediv);
              productimagediv.setAttribute('data-srcset', '');
              productimagediv.setAttribute('srcset', '');
              var imageHeight = productimagediv.clientHeight;
              var imageWidth = productimagediv.clientWidth;
              var maxSize = Math.max(imageHeight, imageWidth);

              if (imagesrc != '') {
                productimagediv.src = imagesrc;
              }

            }
            else {
              var prevElement = $(swatchParent).prev();
              var imageElements = $(prevElement[0]).find('img');
              var allimages = document.querySelectorAll('img');
              productimagediv = imageElements[0];
              if (productimagediv != '' && productimagediv != undefined) {

                productimagediv.setAttribute('data-srcset', '');
                productimagediv.setAttribute('srcset', '');
                var imageHeight = productimagediv.clientHeight;
                var imageWidth = productimagediv.clientWidth;
                var maxSize = Math.max(imageHeight, imageWidth);

                if (imagesrc != '') {
                  productimagediv.src = imagesrc;
                }

                //productimagediv.style.width = maxSize + 'px';
                //productimagediv.style.height = maxSize + 'px';

              }
              else {
                //console.log(prevElement);
                var prevparentElement = prevElement[0].parentElement;
                //console.log(prevparentElement);
                var _imageElements = $(prevparentElement).find('img');
                //console.log(_imageElements);
                var _productimagediv = _imageElements[0];

                if (_productimagediv != '' && _productimagediv != undefined) {

                  _productimagediv.setAttribute('data-srcset', '');
                  _productimagediv.setAttribute('srcset', '');
                  var imageHeight = _productimagediv.clientHeight;
                  var imageWidth = _productimagediv.clientWidth;
                  var maxSize = Math.max(imageHeight, imageWidth);

                  if (imagesrc != '') {
                    _productimagediv.src = imagesrc;
                  }

                  //productimagediv.style.width = maxSize + 'px';
                  //productimagediv.style.height = maxSize + 'px';

                }
              }
            }

            //console.log(prevElement);
            //console.log(imageElements);

            /*for (var i = 0; i < allimages.length; i++) {
                        var _imgclassName = allimages[i].className;
                        if (_imgclassName.includes(producthandle)) {
                            var correctimage = allimages[i];
                            var imageHeight = correctimage.clientHeight;
                            var imageWidth = correctimage.clientWidth;
                            var maxSize = Math.max(imageHeight, imageWidth);
                            correctimage.src = imagesrc;
                            correctimage.style.width = maxSize + 'px';
                            correctimage.style.height = maxSize + 'px';

                            correctimage.setAttribute('data-srcset', '');
                            correctimage.setAttribute('srcset', '');
                            correctimage.src = imagesrc;

                        }
                    }*/

            /*for (var a = 0; a < allatags.length; a++) {
                        var ataghref = allatags[a].href;
                        var imageElements = $(allatags[a]).find('img');
                        productimagediv = imageElements[0];
                        if (ataghref.includes(producturl)) {
                            //allatags[a].setAttribute('href', producturl + '?variant=' + variantid);
                            var children1 = allatags[a].children;
                            for (var a1 = 0; a1 < children1.length; a1++) {

                                if (children1[a1].tagName == 'IMG') {
                                    productimagediv = children1[a1];

                                }
                                var children2 = children1[a1].children;
                                for (var a2 = 0; a2 < children2.length; a2++) {

                                    if (children2[a2].tagName == 'IMG') {
                                        productimagediv = children2[a2];

                                    }

                                    var children3 = children2[a2].children;
                                    for (var a3 = 0; a3 < children3.length; a3++) {

                                        if (children3[a3].tagName == 'IMG') {
                                            productimagediv = children3[a3];

                                        }
                                    }
                                }
                            }
                        }
                    }*/


          });
        }
        if (productstring == 'products') {
          if (appvariables.Swatch_IsActive == true) {

            var swatchDiv = document.getElementById('swatch_pswatchdiv');
            swatchDiv.style.marginTop = appvariables.Swatch_TopPadding + 'px';
            swatchDiv.style.marginBottom = appvariables.Swatch_TopPadding + 'px';
            swatchDiv.style.display = 'inline-block';
            swatchDiv.style.width = '100%';
            var imageSrc = swatchDiv.getAttribute('swatchy-data-variantimage');
            var _url = window.location.href;
            var parameterValue = getParameterByName('variant', _url);
            var swatchDivElement = document.getElementById('swatch_pswatchdiv');
            //swatchDivElement.style.height = ((appvariables.Swatch_Size + (appvariables.Swatch_HighlightThickness * 2)) * 1) + 'px';
            swatchDivElement.style.lineHeight = ((appvariables.Swatch_Size + (appvariables.Swatch_HighlightThickness * 2)) * 1) + 'px';
            swatchDivElement.style.verticalAlign = 'middle';
            swatchDivElement.style.marginBottom = appvariables.Swatch_TopPadding + 'px';
            var swatchSizeDouble = appvariables.Swatch_Size / 2;
            var swatchSizeTriple = appvariables.Swatch_Size / 3;
            var parentElementSize = appvariables.Swatch_Size + 3;
            var swatchcolorelements = document.querySelectorAll('.swatchy_pcolordiv');
            for (s = 0; s < swatchcolorelements.length; s++) {
              swatchcolorelements[s].style.width = appvariables.Swatch_Size + 'px';
              swatchcolorelements[s].style.height = appvariables.Swatch_Size + 'px';
              swatchcolorelements[s].style.lineHeight = appvariables.Swatch_Size + 'px';

              swatchcolorelements[s].style.verticalAlign = 'middle';
              swatchcolorelements[s].style.backgroundClip = 'content-box';
              //swatchcolorelements[s].style.boxShadow = '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)';
              if (appvariables.Swatch_IsCircular == "True") {
                swatchcolorelements[s].style.borderRadius = '50%';
                //_parentElement.style.borderRadius = '50%';

              }
              else {
                swatchcolorelements[s].style.borderRadius = '2px';
                //_parentElement.style.borderRadius = '2px';
              }

              //console.log(swatchyp_swatchtype);
              if (appvariables.SwatchType == 'ImageSwatch') {
                //swatchcolorelements[s].style.borderRadius = '50%';
                swatchcolorelements[s].style.backgroundSize = 'cover';

                /*margin-right: 5px; object-fit: cover; width: 30px; height: 30px; display: inline-block; background-image: url('{{ VariantImageArray[indexvalue] }}'); background-repeat: no-repeat; background-position: 50% 50%;*/
              }
              if (appvariables.SwatchType == 'PatchExtractSwatch') {
                if (DomainName == 'dishblaster.com') {
                  swatchcolorelements[s].style.backgroundPosition = '75% 60%';
                }
              }

              if (appvariables.SwatchType == 'HexColorCode') {
                var colorcodes = appvariables.Swatch_SolidColors;
                if (DomainName == 'sierrasocks.com') {
                  var colorcodeslist = colorcodes.split('!');
                }
                else {
                  var colorcodeslist = colorcodes.split(',');
                }
                var _colorname = swatchcolorelements[s].getAttribute('swatchy-data-color');

                for (var c = 0; c < colorcodeslist.length; c++) {

                  var colorname = colorcodeslist[c].split('_')[0];
                  colorname = colorname.replace('andsymbol', '&');
                  colorname = colorname.replace('plussymbol', '+');
                  colorname = colorname.replace('slashsymbol', '/');
                  colorname = colorname.replace('commasymbol', ',');
                  //colorname = colorname.replace(/spacesymbol/g, ' ');
                  //colorname = colorname.replace(/hypensymbol/g, '-');
                  var colorvaluesstring = colorcodeslist[c].split('_')[1];
                  var colorvaluesList;
                  var colorvalue1 = '';
                  var colorvalue2 = '';
                  var colorvalue3 = '';
                  if (colorvaluesstring != undefined) {
                    colorvaluesList = colorvaluesstring.split('*');
                    colorvalue1 = colorvaluesList[0];
                    colorvalue2 = colorvaluesList[1];
                    colorvalue3 = colorvaluesList[2];
                  }


                  //console.log(_colorname + ',' + colorname + ',' + colorvalue);
                  if (_colorname == colorname) {
                    //console.log(colorname);
                    //console.log(colorvalue1);
                    //console.log(colorvalue2);
                    //console.log(colorvalue3);
                    swatchcolorelements[s].style.backgroundImage = 'none';
                    if ((colorvalue2 == 'FFFFFF' && colorvalue3 == 'FFFFFF') || (colorvalue2 == undefined && colorvalue3 == undefined) || (colorvalue2 == '' && colorvalue3 == '')) {
                      swatchcolorelements[s].style.backgroundColor = '#' + colorvalue1;
                    }
                    if (colorvalue2 == 'FFFFFF' || colorvalue2 == undefined || colorvalue2 == '') {
                      swatchcolorelements[s].style.backgroundColor = '#' + colorvalue1;
                    }
                    else {
                      if (colorvalue3 == 'FFFFFF' || colorvalue3 == undefined || colorvalue3 == '') {
                        //swatchcolorelements[s].style.borderBottom = swatchSizeTriple + 'px solid #' + colorvalue1;
                        //swatchcolorelements[s].style.backgroundColor = swatchSizeTriple + 'px solid #' + colorvalue2;
                        //swatchcolorelements[s].style.borderTop = swatchSizeTriple + 'px solid #' + colorvalue3;
                        //console.log('linear-gradient( -180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 49%, #' + colorvalue2 + ' 49%, #' + colorvalue2 + ' 51%, #' + colorvalue3 + ' 51% )');
                        swatchcolorelements[s].style.background = 'linear-gradient(-180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 49%, #ffffff 49%, #ffffff 49%, #' + colorvalue2 + ' 51%)';

                      }
                      else {
                        //swatchcolorelements[s].style.borderBottom = swatchSizeDouble + 'px solid #' + colorvalue1;
                        //swatchcolorelements[s].style.backgroundColor = '#' + colorvalue2;
                        //swatchcolorelements[s].style.borderTop = '#' + colorvalue3;
                        swatchcolorelements[s].style.background = 'linear-gradient(-180deg, ' + colorvalue1 + ', #' + colorvalue1 + ' 30%, #' + colorvalue2 + ' 25%, #' + colorvalue2 + ' 55%, #' + colorvalue3 + ' 55%)';

                      }
                    }

                    if (colorvalue3 == 'FFFFFF' || colorvalue3 == undefined || colorvalue3 == '') {

                    }
                    else {
                      //swatchcolorelements[s].style.borderBottom = swatchSizeTriple + 'px solid #' + colorvalue1;
                      //swatchcolorelements[s].style.backgroundColor = swatchSizeTriple + 'px solid #' + colorvalue2;
                      //swatchcolorelements[s].style.borderTop = swatchSizeTriple + 'px solid #' + colorvalue3;
                      //console.log('linear-gradient( -180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 49%, #' + colorvalue2 + ' 49%, #' + colorvalue2 + ' 51%, #' + colorvalue3 + ' 51% )');
                      swatchcolorelements[s].style.background = 'linear-gradient(-180deg, #' + colorvalue1 + ', #' + colorvalue1 + ' 30%, #' + colorvalue2 + ' 25%, #' + colorvalue2 + ' 55%, #' + colorvalue3 + ' 55%)';
                    }


                  }
                }

              }

              /*if (laststring == 'glow-in-dark-zodiac-charms') {
                                var _swatchDivs = document.querySelectorAll('.swatchy_pcolordiv');
                                //console.log(_swatchDivs);
                                if (_swatchDivs.length > 0) {
                                    for (var s = 0; s < _swatchDivs.length; s++) {
                                        _swatchDivs[s].style.backgroundSize = 'unset';
                                        _swatchDivs[s].style.width = '60px';
                                        _swatchDivs[s].style.height = '60px';
                                    }
                                }

                            }*/
              if (parameterValue != '' && parameterValue != null) {

                var variantid = swatchcolorelements[s].getAttribute('swatchy-data-variantid');

                if (variantid == parameterValue) {
                  swatchcolorelements[s].style.padding = '3px';
                  swatchcolorelements[s].style.backgroundClip = 'content-box';
                  swatchcolorelements[s].setAttribute('data-balloon-visible', '');
                  swatchcolorelements[s].style.boxShadow = '0px 0px 0px ' + appvariables.Swatch_HighlightThickness + 'px #' + appvariables.Swatch_HighlightColor;
                  swatchcolorelements[s].style.width = (appvariables.Swatch_Size * 1) + 3 + 'px';
                  swatchcolorelements[s].style.height = (appvariables.Swatch_Size * 1) + 3 + 'px';
                  swatchcolorelements[s].style.lineHeight = (appvariables.Swatch_Size * 1) + 3 + 'px';
                  //var parentElement = swatchcolorelements[s].parentElement;
                  //parentElement.style.border = appvariables.Swatch_HighlightThickness + 'px solid #' + appvariables.Swatch_HighlightColor;
                }
              }
            }

            console.log(swatchyp_colorindex);
            var allselects = [];
            //swatch_pswatchdiv.style.height = '50px';
            var addtocartform = $('form[action="/cart/add"]')[0];
            if (DomainName == 'littleproductsshop.com') {
              addtocartform = $('#addToCartForm')[0];
            }
            var allselects = [];
            if (addtocartform != null) {
              var formElements = new Array();

              $.each(addtocartform.elements, function (index, elem) {
                //Do something here.
                if (elem.tagName == 'SELECT') {
                  if (elem.name != 'quantity') {
                    allselects.push(elem);
                  }

                }
              });


            }
            if (allselects.length == 0) {
              var addtocartforms = $('form[action="/cart/add"]');
              for (var f = 0; f < addtocartforms.length; f++) {
                $.each(addtocartforms[f].elements, function (index, elem) {
                  //Do something here.
                  if (elem.tagName == 'SELECT') {
                    if (elem.name != 'quantity') {
                      allselects.push(elem);
                    }
                  }
                });
              }
            }

            var originalcolorselect = '';
            var correctselects = [];
            for (var a = 0; a < allselects.length; a++) {
              if (allselects[a].name != 'id') {
                correctselects.push(allselects[a]);

              }
              if (allselects[a].name == 'id') {
                var originalcolorselect = allselects[a];
              }
            }

            //console.log(correctselects);
            //var allselects = document.querySelectorAll('select');
            //var correctcolorselect = '';
            //var originalcolorselect = '';
            //var correctselects = [];
            //for (var a = 0; a < allselects.length; a++) {
            //    if (allselects[a].name != 'id') {

            //        if (allselects[a].name != null) {
            //            var iscurrencyselect = allselects[a].name.includes('currencies');

            //            if (iscurrencyselect == false) {
            //                correctselects.push(allselects[a]);
            //            }
            //        }
            //        else {
            //            var iscurrencyselect = allselects[a].className.includes('currency');
            //            if (iscurrencyselect == false) {
            //                correctselects.push(allselects[a]);
            //            }                              
            //        }
            //        /*var _iscurrencyselect = allselects[a].className.includes('option');
            //        if (_iscurrencyselect == true) {
            //            correctselects.push(allselects[a]);
            //        }*/

            //    }
            //    if (allselects[a].name == 'id') {
            //        var originalcolorselect = allselects[a];
            //    }
            //}
            //console.log(originalcolorselect);
            correctcolorselect = correctselects[(swatchyp_colorindex - 1)];
            //console.log(correctselects);
            //console.log(correctcolorselect);

            if (DomainName == 'stowedhome.com') {
              if (correctcolorselect != null) {
                if (swatchyp_colorindex != 0) {
                  $(correctcolorselect).after(swatchDiv);
                  //correctcolorselect.style.display = 'none';
                }

              }
            }
            else {
              if (correctcolorselect != null) {
                if (swatchyp_colorindex != 0) {
                  $(correctcolorselect).after(swatchDiv);
                  correctcolorselect.style.display = 'none';
                }

              }
            }

            if (DomainName == 'good-curiosity.myshopify.com') {
              var correctColorSelect = $('fieldset[name="color"]')[0];
              //console.log(correctColorSelect);
              if (correctColorSelect != null) {
                $(correctColorSelect).after(swatchDiv);
                correctColorSelect.style.display = 'none';
              }



            }

            if (DomainName == 'procase.com') {
              var _variantWrapper = document.querySelectorAll('.selector-wrapper')[0];
              if (_variantWrapper != null) {
                _variantWrapper.style.display = 'inline-block';
              }

              var _swatchElement = document.querySelectorAll('.swatch')[0];
              if (_swatchElement != null) {
                _swatchElement.style.display = 'none';
              }
            }
            if (DomainName == 'luxury-kids.com' || DomainName == "chase-zane.com") {
              var colorselect = '';
              var optionHeaders = $('.option-header');
              for (var h = 0; h < optionHeaders.length; h++) {
                var children = optionHeaders[h].children[0];
                //console.log(children.innerHTML);
                if (children.innerHTML == 'Color') {
                  //console.log('color');
                  colorselect = children;
                }
              }
              if (colorselect != null) {
                $(colorselect).append(swatchDiv);
                var colorInputs = $('input[name="Color"]');
                for (var c = 0; c < colorInputs.length; c++) {
                  var parentElement = colorInputs[c].parentElement;
                  parentElement.style.display = 'none';
                }
              }

              var quantityelements = $("[aria-label=Quantity]");
              for (var q = 0; q < quantityelements.length; q++) {
                var element = quantityelements[q];
                if (element.tagName == 'SELECT') {
                  element.style.display = 'block';
                }
              }



            }
            //if (correctcolorselect == null || correctcolorselect == undefined) {
            //    correctcolorselect = originalcolorselect;
            //}

            if (correctcolorselect == null) {
              if (swatchyp_colorindex != 0) {
                var variantwraps = document.querySelectorAll('.variant-input-wrap');
                for (var v = 0; v < variantwraps.length; v++) {
                  if (variantwraps[v].name == 'Color') {

                    $(variantwraps[v]).after(swatchDiv);
                    //correctcolorselect.style.display = 'none';
                    //variantwraps[v].style.display = 'none';
                  }


                }



              }

            }
            //console.log(DomainName);
            if (DomainName == 'angelamara.com') {
              var _swatchDivv = document.querySelector('.ColorSwatchList');
              var _childelements = _swatchDivv.children;
              for (var c = 0; c < _childelements.length; c++) {
                _childelements[c].style.display = 'none';
              }
              var swathItems = document.querySelectorAll('.swatchy_pcolordiv');
              for (var s = 0; s < swathItems.length; s++) {
                swathItems[s].style.border = '1px solid #' + appvariables.Swatch_BorderColor;
              }
              var _ca_swatchdiv = document.getElementById('swatch_pswatchdiv');

              $(_swatchDivv).append(_ca_swatchdiv);
              _ca_swatchdiv.style.marginLeft = '10px';
            }
            if (DomainName == 'duddibeauty.com') {
              var swatch_Div = document.getElementById('swatch_pswatchdiv');
              swatch_Div.style.marginLeft = '100px';
              var parentDiv = swatch_Div.parentElement;
              if (parentDiv != null) {
                parentDiv.style.height = '40px';
              }
            }
            if (DomainName == "pesani.com.mx") {
              var swatchElement = document.getElementById('swatch_pswatchdiv');
              if (swatchElement != null) {
                var allcolorswatches = document.querySelectorAll('.swatch-element.color');
                var firstElement = allcolorswatches[0];
                var parentElement = firstElement.parentElement;
                //console.log(parentElement);
                //console.log(parentElement);
                $(parentElement).append(swatchElement);
                swatchElement.style.display = 'block';

                for (var a = 0; a < allcolorswatches.length; a++) {
                  allcolorswatches[a].style.display = 'none';

                }
              }
            }
            if (Shopify.theme.name == "Mr Parker") {
              var swatchElements = document.querySelectorAll('.swatch');
              var correctswatchelement = swatchElements[swatchyp_colorindex - 1];
              //$(correctswatchelement).after(swatchDiv);
              if (correctswatchelement != null) {
                correctswatchelement.style.display = 'none';
                var selectwrappers = document.querySelectorAll('.selector-wrapper');
                var colorselectwrapper = selectwrappers[swatchyp_colorindex - 1];
                if (colorselectwrapper != null) {
                  colorselectwrapper.style.display = 'block';
                }
              }
            }
            var evObj = document.createEvent("Event");
            evObj.initEvent("change", true, true);


            if (DomainName == "iphoneluxry.myshopify.com" || DomainName == 'theengraved.myshopify.com') {
              var arrowspans = document.querySelectorAll('span.arrow');
              var arrowspan = arrowspans[0];
              if (arrowspan != null) {
                arrowspan.style.display = 'none';
              }
              //console.log(correctcolorselect);
              var parentElement = correctcolorselect.parentElement;
              //console.log(parentElement);
              if (parentElement != null) {
                var _nextElement = $(parentElement).next();
                var nextElement = _nextElement[0];
                //console.log(nextElement);
                if (nextElement != null) {
                  nextElement.style.display = 'none';
                }
              }
            }

            if (DomainName == "otimaideia.com" || Shopify.theme.name == "Brooklyn" || Shopify.theme.name == "CSP-Copy of Brooklyn") {
              //console.log(correctcolorselect);
              var _swatchElement = document.getElementById('swatch_pswatchdiv');
              var correctcolorselects = document.querySelectorAll('.single-option-radio');
              correctcolorselect = correctcolorselects[swatchyp_colorindex - 1];

              if (correctcolorselect != null) {
                correctcolorselect.style.display = 'none';
                $(correctcolorselect).after(_swatchElement);
              }

            }

            if (DomainName == "stowedhome.com") {
              var _swatchElement = document.getElementById('swatch_pswatchdiv');
              var __correctcolorselect = document.querySelectorAll('.product-options')[0];
              if (__correctcolorselect != null) {
                // __correctcolorselect.style.display = 'none';
                $(__correctcolorselect).after(_swatchElement);
              }
            }

            if (DomainName == 'dishblaster.com') {

              if (swatchyp_colorindex != 0) {
                var _colorDiv = $('fieldset[name="color"]')[0];
                //console.log(_colorDiv);
                if (_colorDiv != null) {
                  $(_colorDiv).after(swatchDiv);
                }

                //correctcolorselect.style.display = 'none';
              }
            }
            if (DomainName == 'youel.store' || DomainName == 'marvinmall.store' || DomainName == 'handclap.store') {

              if (swatchyp_colorindex != 0) {
                var _colorDiv = $('fieldset')[swatchyp_colorindex - 1];
                //console.log(_colorDiv);
                if (_colorDiv != null) {
                  $(_colorDiv).after(swatchDiv);
                }

                _colorDiv.style.display = 'none';
              }
            }
            if (DomainName == 'littleproductsshop.com') {
              var _swatchElement = document.getElementById('swatch_pswatchdiv');
              //console.log(correctcolorselect);
              if (correctcolorselect != null) {
                // __correctcolorselect.style.display = 'none';
                $(correctcolorselect).after(_swatchElement);
              }
            }
            if (DomainName == 'bareafashion.be') {
              var _optionvariants = document.querySelectorAll('.variant-input-wrap');
              var _variantoption = _optionvariants[swatchyp_colorindex - 1];
              var _swatchdiv = document.getElementById('swatch_pswatchdiv');
              $(_variantoption).after(_swatchdiv);
              _variantoption.style.display = 'none';
              _swatchdiv.style.marginBottom = '15px';

            }
            $('.swatchy_pcolordiv').click(function (e) {
              if (Shopify.shop != null) {
                if (Shopify.shop == 'vsmooth.myshopify.com') {
                  var swatchdiv = e.currentTarget;
                  /*var indexvalue = swatchdiv.getAttribute('caf-index-value');
                                    if (_urlslist.length > 1) {
                                        var _urltoredirect = _urlslist[indexvalue];
                                        window.location = _urltoredirect;
                                    }*/

                }
                else {
                  var swatchdiv = e.currentTarget;
                  var producturl = swatchdiv.getAttribute('swatchy-data-href');
                  var imagesrc = swatchdiv.getAttribute('swatchy-data-variantimage');
                  var allswatches = document.querySelectorAll('.swatchy_pcolordiv');
                  //console.log(correctcolorselect);
                  for (var a = 0; a < allswatches.length; a++) {
                    if (DomainName != 'angelamara.com') {
                      allswatches[a].style.border = 'none';
                    }
                    allswatches[a].style.boxShadow = 'none';

                    //allswatches[a].style.transform = 'scale(1)';
                    //allswatches[a].style.transform = 'scale(1)';
                    allswatches[a].style.width = (appvariables.Swatch_Size * 1) + 'px';
                    allswatches[a].style.height = (appvariables.Swatch_Size * 1) + 'px';
                    //allswatches[a].style.lineHeight = (appvariables.Swatch_Size * 1) + 'px';
                    allswatches[a].style.padding = '0px';
                    allswatches[a].removeAttribute('data-balloon-visible');
                  }
                  var swatchdiv = e.currentTarget;
                  swatchdiv.style.backgroundClip = 'content-box';
                  swatchdiv.style.padding = '3px';
                  swatchdiv.style.width = (appvariables.Swatch_Size * 1) + 3 + 'px';
                  swatchdiv.style.height = (appvariables.Swatch_Size * 1) + 3 + 'px';
                  swatchdiv.style.boxShadow = '0px 0px 0px ' + appvariables.Swatch_HighlightThickness + 'px #' + appvariables.Swatch_HighlightColor;
                  //swatchdiv.style.transform = 'scale(1.2)';
                  //swatchdiv.style.border = appvariables.Swatch_HighlightThickness + 'px solid #' + appvariables.Swatch_HighlightColor;
                  var allatags = document.querySelectorAll('a');
                  var optionvalue = swatchdiv.getAttribute('swatchy-data-color');
                  var option_image = swatchdiv.getAttribute('swatchy-data-variantimage');
                  //console.log(correctcolorselect);
                  //console.log(correctcolorselect);
                  //console.log(correctcolorselect);
                  if (DomainName == "stowedhome.com") {

                  }
                  else {
                    if (correctcolorselect != null && DomainName != "chase-zane.com" && DomainName != "stowedhome.com") {
                      $(correctcolorselect).val(optionvalue).trigger('change');
                      correctcolorselect.dispatchEvent(evObj);
                    }
                    else {
                      // for some themes
                      if (DomainName == "stowedhome.com") {
                        //console.log(correctcolorselect);
                        //console.log(optionvalue);
                        $(correctcolorselect).val(optionvalue).trigger('change');
                      }
                      else {
                        $("input[value='" + optionvalue + "']").trigger('click');
                      }

                    }
                    if (correctcolorselect == null) {
                      var variantid = swatchdiv.getAttribute('swatchy-data-variantid');
                      if (window.location.hostname == 'leonardoray.com') {
                        $(originalcolorselect).val(variantid).trigger('change');
                        originalcolorselect.dispatchEvent(evObj);
                      }
                    }
                    if (DomainName == "good-curiosity.myshopify.com") {
                      $("input[value='" + optionvalue + "']").trigger('click');
                    }
                    if (DomainName == "otimaideia.com" || Shopify.theme.name == "Brooklyn" || Shopify.theme.name == "CSP-Copy of Brooklyn") {
                      $("input[value='" + optionvalue + "']").trigger('click');
                      if (correctcolorselect != null) {
                        $(correctcolorselect).val(optionvalue).trigger('change');
                        correctcolorselect.dispatchEvent(evObj);
                      }


                    }
                    if (window.location.hostname == "betsyandadam.myshopify.com") {
                      var _imageElementDiv = document.querySelectorAll('.full')[0];
                      var imageElements = $(_imageElementDiv).find('img');
                      for (var _i = 0; _i < imageElements.length; _i++) {
                        var _image_Element = imageElements[_i];


                        //option_image = option_image.replace('300x300', '800x800');
                        //_image_Element.src = option_image;
                      }
                      option_image = option_image.replace('300x300', '');
                      var _slickATag = $("[data-id='" + option_image + "']")[0];
                      if (_slickATag != null) {
                        _slickATag.click();
                      }
                    }
                    if (Shopify.theme.name == "Brooklyn") {
                      // $("input[value='" + optionvalue + "']").trigger('click');
                      var _swatchElement = document.getElementById('swatch_pswatchdiv');
                      /*var correctcolorselects = document.querySelectorAll('.single-option-selector__radio');
                                            correctcolorselect = correctcolorselects[swatchyp_colorindex - 1];*/
                      /* if (correctcolorselect != null) {
                                                 correctcolorselect.style.display = 'none';
                                                 $(correctcolorselect).after(_swatchElement);
                                             }*/

                      // console.log(correctcolorselects);
                      // console.log(swatchyp_colorindex);
                      // console.log(correctcolorselect);
                      /*  if (correctcolorselect != null) {
                                                  $(correctcolorselect).val(optionvalue).trigger('change');
                                                  correctcolorselect.dispatchEvent(evObj);
                                              }*/
                      $("input[value='" + optionvalue + "']").trigger('click');

                    }
                    if (DomainName == "luxury-kids.com" || DomainName == "chase-zane.com") {
                      $("input[value='" + optionvalue + "']").trigger('click');
                    }
                    if (Shopify.theme.name == "Mr Parker" || Shopify.theme.name == "Fashionopolism") {
                      $("input[value='" + optionvalue + "']").trigger('click');
                    }

                    if (correctcolorselect != null && Shopify.theme.name != 'Brooklyn') {
                      //console.log(correctcolorselect);
                      $(correctcolorselect).val(optionvalue).trigger('change');
                      correctcolorselect.dispatchEvent(evObj);
                    }
                    //var currentli = document.getElementById(currentli.id);


                    /*if(productimagediv != null)
                                                    {
                                                      productimagediv.setAttribute('data-srcset', '');
                                                      productimagediv.setAttribute('srcset', '');
                                                      productimagediv.src = imagesrc;
                                                    }*/
                  }
                }
              }





            });

            /* $('.swatchy_pcolordiv').hover(function (e) {
                                       var swatchElement = e.currentTarget;

                                       var allswatches = document.querySelectorAll('.swatchy_pcolordiv');
                                       for (var a = 0; a < allswatches.length; a++) {
                                           allswatches[a].style.border = 'none';
                                           //allswatches[a].style.transform = 'scale(1)';
                                           allswatches[a].style.width = (appvariables.Swatch_Size * 1) + 'px';
                                           allswatches[a].style.height = (appvariables.Swatch_Size* 1) + 'px';
                                           allswatches[a].style.lineHeight = (appvariables.Swatch_Size * 1) + 'px';
                                           allswatches[a].style.padding = '0px';
                                           allswatches[a].removeAttribute('data-balloon-visible');  
                                       }
                                       //swatchElement.style.transform = 'scale(1.05)';
                                       var oldwidth = swatchElement.style.width * 1;

                                       //swatchElement.style.width = ((appvariables.Swatch_Size + (appvariables.Swatch_HighlightThickness * 2)) * 1) + 'px';
                                       //swatchElement.style.height = ((appvariables.Swatch_Size + (appvariables.Swatch_HighlightThickness * 2)) * 1) + 'px';
                                       //swatchElement.style.lineHeight = ((appvariables.Swatch_Size + (appvariables.Swatch_HighlightThickness * 2)) * 1) + 'px';
                                       swatchElement.style.padding = '3px';
                                       swatchElement.style.border = appvariables.Swatch_HighlightThickness + 'px solid #' + appvariables.Swatch_HighlightColor;
                                       //swatchElement.style.padding = '5px';

                                   });*/
          }
          // Product page

        }
      });


        //var appvariables = $.getValues("https://autocolorswatches.apphb.com/Api/SwatchAppVariables/GetVariables?DomainName=" + DomainName);
        /*if (appvariables == null) {
                appvariables = $.getValues("https://autocolorswatches.apphb.com/Api/SwatchAppVariablesFromShopName/GetVariables?ShopName=" + _shopname);
            }*/



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
