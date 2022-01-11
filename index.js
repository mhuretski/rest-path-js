const e = () => new Endpoint()

const SCHEMA = {
    admin: {
        brand: {
            create: e(),
            featured: {
                priority: e(),
            },
            spotlight: {
                update: e(),
            },
            update: e(),
        },
        getStatistics: e(),
        listImageProposals: e(),
        listPendingReviewProducts: e(),
        product: {
            update: e(),
        },
        promotion: {
            create: e(),
            delete: e(),
            priority: e(),
            update: e(),
        },
        updateProductsApprovalStatus: e(),
    },
    dataentry: {
        product: {
            imageProposal: {
                update: e(),
            },
            skip: e(),
            update: e(),
        },
        listCompletedProducts: e(),
        listImageProposals: e(),
        listProductsWithEmptyProperties: e(),
    },
    employee: {
        category: {
            list: e(),
        },
        createProducts: e(),
        deleteProductRequests: e(),
        imageProposals: {
            delete: e(),
            update: e(),
        },
        listProductRequests: e(),
        product: {
            create: e(),
        },
        productRequest: {
            delete: e(),
            skip: e(),
        },
        searchBrands: e(),
        skipProductRequests: e(),
    },
    catalog: {
        lookup: {
            createProductRequest: e(),
            id: e(),
            relatedProducts: e(),
            uploadProductPhotos: e(),
            upc: e(),
            validateProductRequest: e(),
        },
        navigation: {
            brands: e(),
            'brands/spotlight': {
                relatedProducts: e(),
            },
            categories: e(),
            id: e(),
            ingredients: e(),
            products: {
                brand: e(),
                category: e(),
                store: e(),
            },
            promotions: e(),
            stores: e(),
        },
        search: e(),
    },
    oauth: {
        check_token: e(),
        token: e(),
    },
    profile: {
        scanHistory: e(),
    },
}

function findPath(e, schema = SCHEMA) {
    for (const key in schema) {
        const notClassKey = !endpointKeys.find((endpointKey) => endpointKey === key)
        // eslint-disable-next-line no-prototype-builtins
        if (notClassKey && schema.hasOwnProperty(key)) {
            if (e.getReference() === schema[key]) {
                if (e.isClass()) {
                    const id = e.getId()
                    const params = e.getParams()
                    e.clearReferenceIfNeeded()

                    return `${key}${id}${params}`
                }
                return key
            } else if (schema[key] && typeof schema[key] === 'object') {
                const path = findPath(e, schema[key])
                if (path) return key + '/' + path
            }
        }
    }
}

class Endpoint {
    _id = ''
    _params = new Map()
    _reference = this

    withId = (id) => {
        const endpoint = new Endpoint()
        endpoint._setId(id)
        endpoint._setParams(this._params)
        endpoint._setReference(this._reference)
        this.clearReferenceIfNeeded()

        return endpoint
    }

    withParams = (params) => {
        const endpoint = new Endpoint()
        endpoint._setId(this._id)
        endpoint._setParams(params)
        endpoint._setReference(this._reference)
        this.clearReferenceIfNeeded()

        return endpoint
    }

    getId = () => (this._id ? `/${this._id}` : '')

    getParams = () => {
        let res = ''
        for (const [key, value] of this._params.entries()) {
            res += `${res ? '&' : '?'}${key}=${value}`
        }

        return res
    }

    getReference = () => this._reference

    clearReferenceIfNeeded = () => {
        if (this === this._reference) return

        this._reference = null
    }

    isClass = () => true

    _setId = (id) => {
        this._id = id
    }

    _setParams = (params) => {
        this._params = params
    }

    _setReference = (reference) => {
        this._reference = reference
    }
}

const endpointKeys = Object.keys(new Endpoint())

console.log(
    findPath(
        SCHEMA.admin.brand.update.withId('qwe').withParams(
            new Map([
                ['asd', 'rdg'],
                ['asdw', '12v3'],
                ['25', '1'],
            ])
        )
    )
)
console.log(findPath(SCHEMA.admin.brand.update.withId('rrr')))
console.log(
    findPath(
        SCHEMA.admin.brand.update.withParams(
            new Map([
                ['asd', 'rdg'],
                ['kek', 'chebureck'],
            ])
        )
    )
)
console.log(findPath(SCHEMA.admin.brand.update))

console.log(
    findPath(
        SCHEMA.catalog.navigation['brands/spotlight'].relatedProducts.withParams(
            new Map([
                ['size', 33],
                ['page', 12],
            ])
        )
    )
)

console.log(
    findPath(
        SCHEMA.catalog.navigation.brands.withParams(
            new Map([
                ['size', 1],
                ['page', 2],
            ])
        )
    )
)
