# Aladin API

*Aladin* is an API to do user registration and session handling using Spreadshirt's User Area and Webscraping technology. Find a list with available resources below.

## resource/user

URL: http://sales.spreadshirt.com/aladin/?resource=user

### HTTP GET

parameter | value | description
--- | --- | ---
email | string (required) |
password | string (required) |

**response representation**

```json
{
  "userId" : "$userId",
  "shops" : [{"id" : "$shopId"}]
}
```

### HTTP POST

parameter | value | description
--- | --- | ---
salutation | string (required) |
firstname | string (required) |
surname | string (required) |
street | string (required) |
zipcode | string (required) |
city | string (required) |
countrycode | string (required) |
statecodeCA | string (required) |
statecode | string (required) |
email | string (required) |
password | string (required) |

**response representation**

```json
{
  "state" : "created",
  "email" : "$email"
}
```

### HTTP DELETE

parameter | value | description
--- | --- | ---
userId | string (required) |
password | string (required) |
sessionCookie | string (required) |

**response representation**

```json
{
  "state" : "deleted",
  "userId" : "$userId"
}
```

## resource/session
URL: http://sales.spreadshirt.com/aladin/?resource=session
### HTTP POST

parameter | value | description
--- | --- | ---
salutation | string (required) |
firstname | string (required) |
surname | string (required) |
street | string (required) |
zipcode | string (required) |
city | string (required) |
countrycode | string (required) |
statecodeCA | string (required) |
statecode | string (required) |
email | string (required) |
password | string (required) |

**response representation**

```json
{
  "sessionCookie" : "$sessionCookie",
  "authURL" : "$authURL"
}
```

# Examples
Find full working examples in `aladin/test/`
