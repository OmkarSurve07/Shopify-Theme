// Put your application javascript here

if( document.getElementById('sort_by') != null) {
    document.querySelector('#sort_by').addEventListener('change',function(e) {
        var url = new URL(window.location.href);
        url.searchParams.set('sort_by',e.currentTarget.value);

        window.location = url.href;
    });
}

if( document.getElementById('AddressCountryNew') != null) {
    document.getElementById('AddressCountryNew').addEventListener('change', function(e) {
        var provinces = this.options[this.selectedIndex].getAttribute('data-provinces');
        var provinceSelector = document.getElementById('AddressCountryNew');
        var provinceArray = JSON.parse(provinces);

        // console.log(provinceArray);
        if(provinceArray.length < 1) {
            provinceSelector.setAttribute('disabled','disabled');
        } else {
            provinceSelector.removeAttribute('disabled');
        }
        provinceSelector.innerHTML = '';
        var options = '';
        for(var i = 0; i < provinceArray.length; i++){
            options += <option value="' + provinceArray[i][0] + '">'+ provinceArray[i][0] +'</option>
        }
        provinceSelector.innerHTML = options;
    });
}

if(document.getElementById("forgotPassword") != null ){
    document.getElementById("forgotPassword").addEventListener("click", function(e) {
        const element = document.querySelector("#forgot_password_form")
        if(element.classList.contains("d-none")){
            element.classList.remove("d-none")
            element.classList.add("d-block")
        }
    })
}

var localeItems = document.querySelectorAll("#localeItem");
if(localeItems.length > 0) {
    localeItems.forEach(item => {
        item.addEventListener("click", event => {
            document.getElementById("localeCode").value = item.getAttribute("lang");
            document.getElementById("localization_form_tag").submit();
        })
    })
}

if(productInfoAnchors.length > 0) {
    productInfoAnchors.forEach(item => {
        item.addEventListener("click", event => {
            var url = '/products' +item.getAttribute('product-handle') + '.js'

            fetch(url)
            .then((resp) => resp.json())
            .then(function(data) {
                console.log(data)

                document.getElementById("productInfoImg").src = data.images[0]
                document.getElementById("productInfoTitle").innerHTML = data.title
                document.getElementById("productInfoPrice").innerHTML = item.getAttribute('product-price')
                document.getElementById("productInfoDescription").innerHTML = data.description

                var variants = data.variants
                var variantSelect = document.getElementById("modelItemID")

                variants.forEach(function(variants , index) {
                    console.log(variants)
                    variantSelect.options[variantSelect.options.length] = new option(variant.option1, variant.id)
                })
                productModel.show()
            })
        })
    })
}

var modelAddToCartForm = document.querySelector("#addToCartForm")

modelAddToCartForm.addEventListener("submit", function(e) {
    e.preventDefault()

    let formData = {
        'items': [
            {
                'id': document.getElementById("modelItemID").value,
                'quantity': document.getElementById("modelItemQuantity").value
            }
        ]
    }

    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then((resp) => resp.json())
    .catch((err) => {
        console.error('Error: ' + err)
    })
})