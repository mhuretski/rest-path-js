# rest-path-js

create REST schema and use js hints for writing paths

js input
```
findPath(SCHEMA.admin.brand.update.withId('qwe').withParams(new Map([['asd', 'rdg'],['asdw', '12v3'],['25', '1'],]))))
findPath(SCHEMA.admin.brand.update.withId('rrr')))
findPath(SCHEMA.admin.brand.update.withParams(new Map([['asd', 'rdg'],['kek', 'chebureck'],]))))
findPath(SCHEMA.admin.brand.update))
findPath(SCHEMA.catalog.navigation['brands/spotlight'].relatedProducts.withParams(new Map([['size', 33],['page', 12],]))))
findPath(SCHEMA.catalog.navigation.brands.withParams(new Map([['size', 1],['page', 2],]))))
```

string output
```
admin/brand/update/qwe?asd=rdg&asdw=12v3&25=1
admin/brand/update/rrr
admin/brand/update?asd=rdg&kek=chebureck
admin/brand/update
catalog/navigation/brands/spotlight/relatedProducts?size=33&page=12
catalog/navigation/brands?size=1&page=2
```
