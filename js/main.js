// Default selection panel
filterSelection("all")

function filterSelection(c) {
    console.log(c)
    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        var element = _("drop_zones").children[i];
        var childDiv = element.getElementsByTagName('div')[0];
        if (element_id_att == c) {
            childDiv.style.border = '3px solid #02578c';
        } else {
            childDiv.style.border = '3px dashed #ccc';
        }
    }

    for(var i=0; i < _("delete").children.length; i++) {
        var element_id_att = _("delete").children[i].getAttribute('id-att');
        var element = _("delete").children[i];
        var childDiv = element.getElementsByTagName('div')[0];
        if (element_id_att == c) {
            childDiv.style.border = '3px solid #df0024';
        } else {
            childDiv.style.border = '3px dashed #ccc';
        }
    }
  var x, i, count = 0;
  x = document.getElementsByClassName("column");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) {
        w3AddClass(x[i], "show");
        count++
    }
    if (x.length == i + 1) {
        console.log("Count:", count*110)
        document.getElementById('main').style.width =  count * 110 + "px";
        if (document.getElementsByClassName('mCSB_container')[0]) {
            document.getElementsByClassName('mCSB_container')[0].style.width =  count * 110 + "px";
        }
    }
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}


// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

// Getting element from ID.
function _(id){
    return document.getElementById(id);
}

var droppedIn = false;
function drag_start(event) {
    // _('app_status').innerHTML = "Dragging the "+event.target.getAttribute('id');
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.setData("text", event.target.getAttribute('id') );
}

function drag_enter(event) {
    // _('app_status').innerHTML = "You are dragging over the "+event.target.getAttribute('id');
}

function drag_leave(event) {
    // _('app_status').innerHTML = "You left the "+event.target.getAttribute('id');
}

function drag_drop(event) {
    event.preventDefault(); /* Prevent undesirable default behavior while dropping */
    console.log(_(event.dataTransfer.getData('text')));
    var elem_id = event.dataTransfer.getData("text");
    if (event.target.getAttribute('id') == 'delete-area') {
        _(elem_id).classList.remove(_(elem_id).getAttribute('path'));
        _(elem_id).classList.add(event.target.getAttribute('id'));
        _(elem_id).removeAttribute('path');
        _(elem_id).setAttribute('path', event.target.getAttribute('id'));
        _(elem_id).classList.remove('show');

        var data = [];
        var images = [];
        var name = null;
        var c = 0;
        for(var i=0; i < _("drop_zones").children.length; i++) {
            var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
            var element = _("drop_zones").children[i];
            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                c++;
            });
            var childDiv = element.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            console.log(requiredDiv);
            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
            requiredDiv.setAttribute('data-badge', c);
            c = 0;
        }

        for(var i=0; i < _("delete").children.length; i++) {
            c = 0;
            var element_id_att = _("delete").children[i].getAttribute('id-att');
            // var path = _(element_id).getAttribute('path');
            var element = _("delete").children[i]
            // console.log(element_id_att);
            // name = element_id_att;
            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                // console.log("inside Counter" + element_id_att);
                c++;
            });
            var childDiv = element.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            console.log(requiredDiv);
            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
            requiredDiv.setAttribute('data-badge', c);
            c = 0;
        }
    } else if (_(elem_id).getAttribute('path') == event.target.getAttribute('id')) {
        console.log("Same Cluster");
    } else {
        _(elem_id).classList.remove(_(elem_id).getAttribute('path'));
        _(elem_id).classList.add(event.target.getAttribute('id'));
        _(elem_id).removeAttribute('path');
        _(elem_id).setAttribute('path', event.target.getAttribute('id'));
        _(elem_id).classList.remove('show');

        var data = [];
        var images = [];
        var name = null;
        var c = 0;
        for(var i=0; i < _("drop_zones").children.length; i++) {
            var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
            var element = _("drop_zones").children[i]
            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                c++;
            });
            var childDiv = element.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            console.log(requiredDiv);
            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
            requiredDiv.setAttribute('data-badge', c);
            c = 0;
        }

        for(var i=0; i < _("delete").children.length; i++) {
            c = 0;
            var element_id_att = _("delete").children[i].getAttribute('id-att');
            var element = _("delete").children[i]
            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                c++;
            });
            var childDiv = element.getElementsByTagName('div')[0];
            var requiredDiv = childDiv.getElementsByTagName('div')[0];
            console.log(requiredDiv);
            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
            requiredDiv.setAttribute('data-badge', c);
            c = 0;
        }
    }
    // _('app_status').innerHTML = "Dropped "+elem_id+" into the "+event.target.getAttribute('id');
    //  _(elem_id).removeAttribute("draggable");
    // _(elem_id).classList.remove('column');
    // _(elem_id).style.height = '50px';
    // _(elem_id).style.width = '50px';
    // _(elem_id).style.borderRadius = '50%';
    // _(elem_id).style.cursor = "default";
    droppedIn = true;
    // $('img[id="'+ event.dataTransfer.getData('text') +'"]').each(function(i, el) {
    //     if(_(event.target.id).getElementsByTagName('img')[0]) {
    //         _(event.target.id).getElementsByTagName('img')[0].src = _(event.dataTransfer.getData('text')).src;
    //     }
    //     // console.log("DRAG AND DROP: " + _(event.target.id).getElementsByTagName('img')[0].src);
    // });

    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        var element = _("drop_zones").children[i]
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
            if (i == 0) {
                var childDiv = element.getElementsByTagName('div')[0];
                var requiredDiv = childDiv.getElementsByTagName('img')[0];
                requiredDiv.src = el.src;
            }
        });
        // var childDiv = element.getElementsByTagName('div')[0];
        // var requiredDiv = childDiv.getElementsByTagName('div')[0];
        // console.log(requiredDiv);
        // var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
        // requiredDiv.setAttribute('data-badge', c);
        // c = 0;
    }
}

function drag_end(event) {
    if(droppedIn == false){
        // _('app_status').innerHTML = "You let the "+event.target.getAttribute('id')+" go.";
    }
    droppedIn = false;
}

// Reading the dropzone and make changes to backend.
function readDropZone(event) {
    var target = $('#submit-btn-id');
    target.attr('data-og-text', target.html()).html("Training : <i class='fa fa-cog fa-spin'></i>");
    console.log(event.target);
    var data = [];
    var images = [];
    var name = null;
    var c = 0;
    var textValueFlag = false;
    for(var i=0; i < _("drop_zones").children.length; i++) {
        var element_id_att = _("drop_zones").children[i].getAttribute('id-att');
        var element = _("drop_zones").children[i];
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
            images.push(el.src.replace('https://s3.amazonaws.com/finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx/', ''));
        });
        var childDiv = element.getElementsByTagName('input')[0];
        var numPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;
        if (childDiv.value) {
            if (!numPattern.test(childDiv.value)) {
                //Storing the new tagged value and making JSON.
                name = childDiv.value.replace(/ /g, "_");
            } else {
                event.target.setAttribute('data-message', "No special characters or numbers other than alphabets are allowed");
                event.target.setAttribute('data-type', 'warning');
                target.attr('data-og-text', target.html()).html("SAVE AND TRAIN");
                return false;
            }
        } else {
            textValueFlag = true;
            console.log("inside");
        }
        data.push({
            "name": name,
            "images": images
        })
        images = [];
        if( _("drop_zones").children.length == i + 1) {
            if (textValueFlag) {
                event.target.setAttribute('data-message', "All the people are still not renamed.");
                target.attr('data-og-text', target.html()).html("SAVE AND TRAIN");
                return false;
            } else {

                // Training
                console.log("Before AJAX : ");
                // target.attr('data-og-text', target.html()).html("Training : <i class='fa fa-cog fa-spin'></i>");
                event.target.setAttribute('data-message', "Training");
                event.target.setAttribute('data-type', 'success');
                $.ajax({
                    type: "POST",
                    url: "http://localhost:5000/tagData",
                    async: false,
                    data: {data},
                
                    success: function(response){
                        console.log("Response : " + JSON.stringify(response));
                        if(response.status == 200){
                            event.target.setAttribute('data-message', "Data trained successfully, you will get a notification.");
                            event.target.setAttribute('data-type', 'success');
                            setTimeout(() => {
                                target.attr('data-og-text', target.html()).html("Trained");
                            }, 1000)

                            setTimeout(() => {
                                document.getElementById('no-data-alert').innerHTML = 'The images you tagged are successfully trained. These people will be recognised by the names you have given.';
                                $('#no-data-alert').show();
                                $('#main-container-payload').hide();
                            }, 1500)

                            // alert("Success");
                            console.log("Success");
                            console.log(JSON.stringify(response))
                        }
                        else{
                            // alert("Failure");
                            console.log("Error Training")
                            target.attr('data-message', "Error training, please try again later.");
                            target.attr('data-type', 'error');
                            setTimeout(() => {
                                target.attr('data-og-text', target.html()).html("SAVE AND TRAIN");
                            }, 1000)
                        }
                       
                    },
                    dataType: "JSON"
                });
                
            }
        }
    }
}

function deleteObjects(event) {
    var images = [];
    var target = $('#del-btn');
    target.attr('data-message', "Deleting image(s).");
    target.attr('data-type', 'information');
    target.attr('data-og-text', target.html()).html("<i class='fa fa-cog fa-spin'></i>");
    for(var i=0; i < _("delete").children.length; i++) {
        c = 0;
        var element_id_att = _("delete").children[i].getAttribute('id-att');
        var element = _("delete").children[i]
        $('img[path="'+element_id_att +'"]').each(function(i, el) {
            console.log(el + "~~~~~~~~~~~~~");
            let key = el.src.replace('https://s3.amazonaws.com/finddistinctpeoplevideo-s3bucket-1qk0wkjv5fx/', '');
            images.push({
                Key: key
            });
        });
        if (_("delete").children.length == i + 1) {
            console.log(images);
            $.ajax({
                type: "POST",
                url: "http://localhost:5000/deleteObjects",
                async: false,
                data:{images},
                success: function(response){
                    if (response.status == 200) {
                        setTimeout(() => {
                            var target = $('#del-btn');
                            target.attr('data-og-text', target.html()).html("<i class='fas fa-broom'></i>");
                        }, 2000);
                        target.attr('data-message', "Image(s) deleted successfully");
                        target.attr('data-type', 'information');
                        console.log("success");                        
                        // target.html(target.attr('data-og-text'));
                        for(var i=0; i < _("delete").children.length; i++) {
                            c = 0;
                            var element_id_att = _("delete").children[i].getAttribute('id-att');
                            var element = _("delete").children[i]
                            $('img[path="'+element_id_att +'"]').each(function(i, el) {
                                $(el).remove();
                            });
                            var childDiv = element.getElementsByTagName('div')[0];
                            var requiredDiv = childDiv.getElementsByTagName('div')[0];
                            console.log(requiredDiv);
                            var value2 = parseInt(requiredDiv.getAttribute('data-badge'));
                            requiredDiv.setAttribute('data-badge', c);
                            c = 0;
                        }

                    } else if (response.status == 400){
                        console.log("error")
                    } else if (response.status == 415) {
                        target.attr('data-message', "There are no images in the bin to delete.");
                        target.attr('data-type', 'warning');
                        setTimeout(() =>{
                            target.attr('data-og-text', target.html()).html("<i class='fas fa-broom'></i>");
                        }, 1000)
                    }
                },
                dataType: "JSON"
            })
        }
    }
}
