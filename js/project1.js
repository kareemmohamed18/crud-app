var productName = document.getElementById('productName');
var productPrice = document.getElementById('productPrice');
var productCategory = document.getElementById('productCategory');
var productDesc = document.getElementById('productDesc');
var inputs = document.getElementsByClassName('form-control');
var addBtn = document.getElementById('addBtn');
var currentIndex = 0;



var productsContainer=[];

// if (JSON.parse(localStorage.getItem('productsList'))!=null)
// {
//     productsContainer=JSON.parse(localStorage.getItem('productList'));
// }

if(JSON.parse(localStorage.getItem('productsList')) !=null)
{
    productsContainer = JSON.parse(localStorage.getItem('productsList'));
    displayProduct();
}

addBtn.onclick= function ()
{
    if(addBtn.innerHTML== 'Add Product')
    {
        addProduct();
       
        
    }
    else
    {
        updateProduct()
    }

   
    clearForm();
    displayProduct()
}

function addProduct()
{
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    };

    productsContainer.push(product);
    localStorage.setItem('productsList',JSON.stringify(productsContainer));
    

}
function clearForm()
{

    for(var i=0 ; i<inputs.length ; i++)
    {
        inputs[i].value="";
    }
//     productName.value=" ";
//     productPrice.value=" ";
//     productCategory.value=" ";
//     productDesc.value=" ";
    }

function displayProduct()
{
    var cartona = ``;

    for(var i=0 ; i<productsContainer.length ; i++)
    {
        cartona +=  `
        <tr>
                <td>${i}</td>
                <td> ${productsContainer[i].name} </td>
                <td> ${productsContainer[i].price}</td>
                <td> ${productsContainer[i].category }</td>
                <td> ${productsContainer[i].desc}</td>
                <td><button onclick="getProductInfo(${i})" class=" btn btn-outline-warning btn-sm">Update</button></td>
                <td><button onclick="dleteProduct(${i})" class=" btn btn-outline-danger btn-sm">Dlete</button></td>
            </tr>
        `
    }

    document.getElementById('tableBody').innerHTML=cartona;
}


function dleteProduct(index)
{
    productsContainer.splice(index ,1);
    displayProduct();
    localStorage.setItem('productsList' , JSON.stringify(productsContainer));

}


function searchProduct(searchText)
{
    var cartona = ``;

    for(var i=0 ; i<productsContainer.length ; i++)
    {
        if(productsContainer[i].name.toLowerCase().includes(searchText.toLowerCase()))
    {
        cartona +=  `
        <tr>
                <td>${i}</td>
                <td> ${productsContainer[i].name} </td>
                <td> ${productsContainer[i].price}</td>
                <td> ${productsContainer[i].category }</td>
                <td> ${productsContainer[i].desc}</td>
                <td><button onclick="getProductInfo(${i})" class=" btn btn-outline-warning btn-sm">Update</button></td>
                <td><button onclick="dleteProduct(${i})" class=" btn btn-outline-danger btn-sm">Dlete</button></td>
            </tr>
        `
    }


    }
    document.getElementById('tableBody').innerHTML=cartona;
}


function getProductInfo(index)
{

    currentIndex=index;
    var currentProduct = productsContainer[index];
    productName.value = currentProduct.name;
    productPrice.value = currentProduct.price;
    productCategory.value = currentProduct.category;
    productDesc.value = currentProduct.desc; 
    addBtn.innerHTML='updateProduct';
}

function updateProduct()
{
    var product=
    {
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        desc:productDesc.value,
    };
    productsContainer[currentIndex]=product;
    localStorage.setItem('productsList' , JSON.stringify(productsContainer));
 

}

var nameAlert=document.getElementById('nameAlert');
var priceAlert=document.getElementById('priceAlert');
var categoryAlert=document.getElementById('categoryAlert');

productName.onkeyup= function validProductName()
{
    var regex = /^[A-Z][a-z]{2,5}$/;

    if(regex.test(productName.value)==true)
    {
        productName.classList.replace('is-invalid' , 'is-valid' );
        nameAlert.classList.add('d-none');
        
        return true;

    }
    else
    {
        productName.classList.add('is-invalid');
        nameAlert.classList.remove('d-none');
        return false;

    };

    

}


productPrice.onkeyup= function validProductprice()
{
    var regex = /^[0-9]{2,4}$/;

    if(regex.test(productPrice.value)==true)
    {
        productPrice.classList.replace('is-invalid' , 'is-valid' );
        priceAlert.classList.add('d-none');
        return true;
    }
    else
    {
        productPrice.classList.add('is-invalid');
        priceAlert.classList.remove('d-none');
        return false;

    }
}


productCategory.onkeyup= function validProductCategory()
{
    var regex = /^[A-Z][a-z]{2,5}$/;

    if(regex.test(productCategory.value)==true)
    {
        productCategory.classList.replace('is-invalid' , 'is-valid' );
        categoryAlert.classList.add('d-none');
        return true;
    }
    else
    {
        productCategory.classList.add('is-invalid');
        categoryAlert.classList.remove('d-none');
        return false;

    }
}


function changeDisable()
{
    if( validProductName() ==true )
    {
        addBtn.removeAttribute('disabled');
    }
    else
    {
        addBtn.disabled=true;
    }
}


