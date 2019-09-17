function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}


function initSupplierList() {
    const btnCreate = document.querySelectorAll('.action-create')[0];
    btnCreate.addEventListener('click', () => {
        document.location = 'supplier_create.html';
    });

    axios.get('http://localhost:3000/suppliers')
        .then((response) => {
            const suppliers = response.data;

            const node = document.getElementById('app');
            const html = suppliers
                .map(supplier => `<tr>
    <td>${supplier.name}</td>
    <td>${supplier.contact}</td>
    <td>${supplier.telephone}</td>
    <td>
        <a href="supplier_edit.html?id=${supplier.id}" class="button">Edit</a>
        <button class="button is-danger action-delete" data-id="${supplier.id}">Supprimer</button>
    </td>
    
</tr>`)
                .join('');
            node.innerHTML = `<table class="table is-fullwidth">
    <thead>
        <tr>
            <th>Nom du fournisseur</th>
            <th>Contact</th>
            <th>Téléphone</th>
            <th>Action</th>
        </tr>
    </thead>
${html}
</table>`;

            document.querySelectorAll('.action-delete').forEach(button =>{
                button.addEventListener('click', () =>{

                    const id = button.getAttribute('data-id')
                    axios.delete('http://localhost:3000/suppliers/' + id)

                        .then(() => {
                            window.location.replace("fournisseurs.html");
                        })
                })
            })
        });
}

function initSupplierCreateForm() {
    const btnCreate = document.querySelectorAll('.action-do-create')[0];

    btnCreate.addEventListener('click', () => {
        const name = document.querySelectorAll('input[name="name"]')[0].value;
        const contact = document.querySelectorAll('input[name="contact"]')[0].value;
        const telephone = document.querySelectorAll('input[name="telephone"]')[0].value;

        axios.post('http://localhost:3000/suppliers', {
            name,
            contact,
            telephone,
        }).then(() => {
            window.history.back();
        }).catch((err) => {
            alert('Error!');
        });
    });

    const btnGoBack = document.querySelectorAll('.action-go-back')[0];

    btnGoBack.addEventListener('click', () => {
        window.history.back();
    });
}

function initSupplierEditForm(){
    const urlParam = new URLSearchParams(window.location.search);
    const id = urlParam.get('id');
    axios.get(`http://localhost:3000/suppliers/${id}`)
        .then((response) =>{
            const supplier = response.data;
            document.querySelectorAll('input[name="name"]')[0].value =supplier.name;
            document.querySelectorAll('input[name="contact"]')[0].value = supplier.contact;
            document.querySelectorAll('input[name="telephone"]')[0].value = supplier.telephone;

        });


    const btnSave = document.querySelectorAll('.action-do-save')[0];

    btnSave.addEventListener('click', () => {
        const name = document.querySelectorAll('input[name="name"]')[0].value;
        const contact = document.querySelectorAll('input[name="contact"]')[0].value;
        const telephone = document.querySelectorAll('input[name="telephone"]')[0].value;

        axios.put(`http://localhost:3000/suppliers/${id}`, {
            name,
            contact,
            telephone,
        }).then(() => {
            window.location.replace("fournisseurs.html");
        }).catch((err) => {
            alert('Error!');
        });
    });
}



function initProductList(){
    const btnCreate = document.querySelectorAll('.action-create')[0];
    btnCreate.addEventListener('click', () => {
        document.location = 'product_create.html';
    });

    axios.get('http://localhost:3000/products/')
        .then((response) => {
            const products = response.data;

            const node = document.getElementById('app');
            const html = products
                .map(product => `<tr>
    <td>${product.title}</td>
    <td>${product.modelNo}</td>
    <td>${product.code}</td>
    <td>${product.unitPrice}</td>
    <td>${product.inventory}</td>
    <td>
        <a href="product_edit.html?id=${product.id}" class="button">Edit</a>
        <button class="button is-danger action-delete" data-id="${product.id}">Supprimer</button>
    </td>
    
</tr>`)
                .join('');
            node.innerHTML = `<table class="table is-fullwidth">
    <thead>
        <tr>
            <th>Nom du produit</th>
            <th>Numero de model</th>
            <th>Code de produit</th>
            <th>Prix unitaire</th>
            <th>Stock</th>
            <th>Action</th>
        </tr>
    </thead>
${html}
</table>`;

            document.querySelectorAll('.action-delete').forEach(button =>{
                button.addEventListener('click', () =>{

                    const id = button.getAttribute('data-id')
                    axios.delete('http://localhost:3000/products/' + id)

                        .then(() => {
                            window.location.replace("produits.html");
                        })
                })
            })
        });
}

function initProductCreateForm() {
    const btnCreate = document.querySelectorAll('.action-do-create')[0];

    btnCreate.addEventListener('click', () => {
        const title = document.querySelectorAll('input[name="title"]')[0].value;
        const modelNo = document.querySelectorAll('input[name="modelNB"]')[0].value;
        const code = document.querySelectorAll('input[name="code"]')[0].value;
        const unitPrice = document.querySelectorAll('input[name="unitPrice"]')[0].value;
        const inventory = document.querySelectorAll('input[name="nb"]')[0].value;

        axios.post('http://localhost:3000/products', {
            title,
            modelNo,
            code,
            unitPrice,
            inventory
        }).then(() => {
            window.history.back();
        }).catch((err) => {
            alert('Error!');
        });
    });

    const btnGoBack = document.querySelectorAll('.action-go-back')[0];

    btnGoBack.addEventListener('click', () => {
        window.history.back();
    });
}

function initProductEditForm(){
    const urlParam = new URLSearchParams(window.location.search);
    const id = urlParam.get('id');
    axios.get(`http://localhost:3000/products/${id}`)
        .then((response) =>{
            const product = response.data;
            document.querySelectorAll('input[name="title"]')[0].value  = product.title;
            document.querySelectorAll('input[name="modelNB"]')[0].value = product.modelNo;
            document.querySelectorAll('input[name="code"]')[0].value = product.code;
            document.querySelectorAll('input[name="unitPrice"]')[0].value = product.unitPrice;
            document.querySelectorAll('input[name="nb"]')[0].value = product.inventory;

        });


    const btnSave = document.querySelectorAll('.action-do-save')[0];

    btnSave.addEventListener('click', () => {
        const title = document.querySelectorAll('input[name="title"]')[0].value;
        const modelNo = document.querySelectorAll('input[name="modelNB"]')[0].value;
        const code = document.querySelectorAll('input[name="code"]')[0].value;
        const unitPrice = document.querySelectorAll('input[name="unitPrice"]')[0].value;
        const inventory = document.querySelectorAll('input[name="nb"]')[0].value;

        axios.put(`http://localhost:3000/products/${id}`, {
            title,
            modelNo,
            code,
            unitPrice,
            inventory
        }).then(() => {
            window.location.replace("produits.html");
        }).catch((err) => {
            alert('Error!');
        });
    });

    const btnGoBack = document.querySelectorAll('.action-go-back')[0];

    btnGoBack.addEventListener('click', () => {
        window.history.back();
    });
}


function renderMenu(){
    const html = `   
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="index.html">
                <img src="https://media.licdn.com/dms/image/C4E0BAQF0lgCgOff8KA/company-logo_200_200/0?e=2159024400&v=beta&t=2MV_LDPvwCsC2ImTcEje1SRIn_KFyxK1egSQG26wmhU" >
            </a>
    
            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
    
        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item action-products">
                    Produits
                </a>
    
                <a class="navbar-item action-suppliers">
                    Fournisseurs
                </a>
    
                <a class="navbar-item action-aide">
                    Aide
                </a>
    
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>
    
                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            There
                        </a>
                        <a class="navbar-item">
                            Is
                        </a>
                        <a class="navbar-item">
                            Nothing
                        </a>
                        <a class="navbar-item">
                            Here
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>`;
    const bodyElement = document.querySelectorAll('body')[0];
    bodyElement.innerHTML = html;

    const element = document.querySelectorAll('.action-suppliers')[0];
    element.addEventListener('click', () => {
        debugger;
        renderApp(renderSupplierList);
    });

}

function renderApp(fn){
    renderMenu();

    const bodyElement = document.querySelectorAll('body')[0];

    const section = document.createElement('SECTION');
    section.innerHTML = renderMenu() + `
    <section class="section">
        <div class="container">
            ${fn()}
        </div>
    </section>`;

    const customElement = fn();
    const hostElement = section.querySelectorAll('.container')[0];
    hostElement.insertAdjacentElement('beforeend', customElement);

    bodyElement.insertAdjacentElement('beforeend', section);
}

function renderIndex(){
    const element = document.createElement('DIV');
    element.innerHTML = `            
            <h1 class="title is-1">
                Bienvenue dans Autoparts!, veuillez selectionner un element du menu
            </h1>`;

    return element;
}

function renderSupplierList(){
    const element = document.createElement('DIV');
    element.innerHTML = `
        <h1 class="title">
            Liste des fournisseurs
            <button class="button is-success action-create">
                Ajouter un fournisseur
            </button>
        </h1>
`;
    initSupplierList(element);
    return element;
}