"use strict";
var ruleTester_1 = require("./ruleTester");
var ruleTester = new ruleTester_1.RuleTester('space-in-parens');
var MISSING_SPACE_ERROR = 'there must be a space inside this paren.';
var REJECTED_SPACE_ERROR = 'there should be no spaces inside this paren.';
function expecting(errors) {
    return errors.map(function (err) {
        if (err.message && err.column) {
            return {
                failure: err.message,
                startPosition: new ruleTester_1.Position(err.line, err.column),
                endPosition: new ruleTester_1.Position(err.line, err.column)
            };
        }
    });
}
ruleTester.addTestGroup('valid', 'should pass valid', [
    { code: 'foo()', options: ['always'] },
    { code: 'foo\n(\nbar\n)\n', options: ['always'] },
    { code: 'foo\n(  \nbar\n )\n', options: ['always'] },
    { code: 'foo\n(\n bar  \n)\n', options: ['always'] },
    { code: 'foo\n( \n  bar \n  )\n', options: ['always'] },
    { code: 'foo\n(\t\nbar\n)', options: ['always'] },
    { code: '\tfoo(\n\t\tbar\n\t)', options: ['always'] },
    { code: '\tfoo\n(\t\n\t\tbar\t\n\t)', options: ['always'] },
    { code: 'var x = ( 1 + 2 ) * 3', options: ['always'] },
    { code: 'var x = `foo(bar)`', options: ['always'] },
    { code: 'var x = "bar( baz )"', options: ['always'] },
    { code: 'var foo = `(bar)`;', options: ['always'] },
    { code: 'var foo = `(bar ${baz})`;', options: ['always'] },
    { code: 'var foo = `(bar ${( 1 + 2 )})`;', options: ['always'] },
    { code: 'bar()', options: ['never'] },
    { code: 'bar(baz)', options: ['never'] },
    { code: 'var x = (4 + 5) * 6', options: ['never'] },
    { code: 'foo\n(\nbar\n)\n', options: ['never'] },
    { code: 'foo\n(  \nbar\n )\n', options: ['never'] },
    { code: 'foo\n(\n bar  \n)\n', options: ['never'] },
    { code: 'foo\n( \n  bar \n  )\n', options: ['never'] },
    { code: 'var foo = `( bar )`;', options: ['never'] },
    { code: 'var foo = `( bar ${baz} )`;', options: ['never'] },
    { code: 'var foo = `(bar ${(1 + 2)})`;', options: ['never'] },
    { code: 'new MyClass( somethimg )', options: ['always'] },
    { code: 'if ( true ) {}', options: ['always'] },
    { code: 'if (true) {}', options: ['never'] },
    { code: 'while ( true ) {}', options: ['always'] },
    { code: 'while (true) {}', options: ['never'] },
    { code: 'for ( let i=0; i<100; i++ ) {}', options: ['always'] },
    { code: 'for (let i=0; i<100; i++) {}', options: ['never'] },
    { code: 'for ( let i in foo ) {}', options: ['always'] },
    { code: 'for (let i in foo) {}', options: ['never'] },
    { code: 'for ( let i of foo ) {}', options: ['always'] },
    { code: 'for (let i of foo) {}', options: ['never'] },
    { code: 'class Test { foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
    { code: 'class Test { foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
    { code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }', options: ['always'] },
    { code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }', options: ['never'] },
    { code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
    { code: 'function foo(bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
    { code: 'function ( bar:string, asdsd:number, asd:any ) : void {}', options: ['always'] },
    { code: 'function (bar:string, asdsd:number, asd:any) : void {}', options: ['never'] },
    { code: 'constructor( bar:string, asdsd:number, asd:any ){}', options: ['always'] },
    { code: 'constructor(bar:string, asdsd:number, asd:any){}', options: ['never'] },
    { code: 'foo({ bar: "baz" })', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: ['[]', '()'] }] },
    { code: 'foo( 1, { bar: "baz" })', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo({ bar: "baz" }, 1 )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo({\nbar: "baz",\nbaz: "bar"\n})', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo({ bar: "baz" })', options: ['never', { exceptions: ['[]', '()'] }] },
    { code: 'foo( { bar: "baz" } )', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo(1, { bar: "baz" } )', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( { bar: "baz" }, 1)', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( {\nbar: "baz",\nbaz: "bar"\n} )', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo([ 1, 2 ])', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo( [ 1, 2 ] )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo( 1, [ 1, 2 ])', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo([ 1, 2 ], 1 )', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo([\n1,\n2\n])', options: ['always', { exceptions: ['[]'] }] },
    { code: 'foo([ 1, 2 ])', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( [ 1, 2 ] )', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo(1, [ 1, 2 ] )', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo( [ 1, 2 ], 1)', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo( [\n1,\n2\n] )', options: ['never', { exceptions: ['[]'] }] },
    { code: 'foo(( 1 + 2 ))', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo( ( 1 + 2 ) )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo( 1 / ( 1 + 2 ))', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo(( 1 + 2 ) / 1 )', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo((\n1 + 2\n))', options: ['always', { exceptions: ['()'] }] },
    { code: 'foo((1 + 2))', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( (1 + 2) )', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo(1 / (1 + 2) )', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo( (1 + 2) / 1)', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo( (\n1 + 2\n) )', options: ['never', { exceptions: ['()'] }] },
    { code: 'foo()', options: ['always', { exceptions: ['empty'] }] },
    { code: 'foo( )', options: ['always', { exceptions: ['{}'] }] },
    { code: 'foo(\n1 + 2\n)', options: ['always', { exceptions: ['empty'] }] },
    { code: 'foo()', options: ['never', { exceptions: ['{}'] }] },
    { code: 'foo( )', options: ['never', { exceptions: ['empty'] }] },
    { code: 'foo( \n1 + 2\n )', options: ['never', { exceptions: ['empty'] }] },
    { code: 'foo({ bar: "baz" }, [ 1, 2 ])', options: ['always', { exceptions: ['{}', '[]'] }] },
    { code: 'foo({\nbar: "baz"\n}, [\n1,\n2\n])', options: ['always', { exceptions: ['{}', '[]'] }] },
    { code: 'foo(); bar({bar:"baz"}); baz([1,2])', options: ['always', { exceptions: ['{}', '[]', '()'] }] },
    { code: 'foo( { bar: "baz" }, [ 1, 2 ] )', options: ['never', { exceptions: ['{}', '[]'] }] },
    { code: 'foo( {\nbar: "baz"\n}, [\n1,\n2\n] )', options: ['never', { exceptions: ['{}', '[]'] }] },
    { code: 'foo( ); bar( {bar:"baz"} ); baz( [1,2] )', options: ['never', { exceptions: ['{}', '[]', 'empty'] }] },
    { code: 'foo( { bar: "baz" } )', options: ['always', { exceptions: [] }] }
]);
ruleTester.addTestGroup('invalid', 'should fail invalid', [
    {
        code: 'foo( bar)',
        output: 'foo( bar )',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 8 }])
    },
    {
        code: 'foo(bar)',
        output: 'foo( bar )',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 4 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 7 }
        ])
    },
    {
        code: 'var x = ( 1 + 2) * 3',
        output: 'var x = ( 1 + 2 ) * 3',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'var x = (1 + 2 ) * 3',
        output: 'var x = ( 1 + 2 ) * 3',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'foo\n(bar\n)\n',
        output: 'foo\n( bar\n)\n',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 1, column: 1 }])
    },
    {
        code: 'bar(baz )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 8 }])
    },
    {
        code: 'bar( baz )',
        output: 'bar(baz)',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 4 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 9 }
        ])
    },
    {
        code: 'var x = ( 4 + 5) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: 'var x = (4 + 5 ) * 6',
        output: 'var x = (4 + 5) * 6',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 15 }])
    },
    {
        code: 'new MyClass( hey)',
        output: 'new MyClass( hey )',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 16 }])
    },
    {
        code: 'new MyClass( hey)',
        output: 'new MyClass(hey)',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 12 }])
    },
    {
        code: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        output: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 27 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 62 }
        ])
    },
    {
        code: 'class Test { protected foo(bar:string, asdsd:number, asd:any) : void {} }',
        output: 'class Test { protected foo( bar:string, asdsd:number, asd:any ) : void {} }',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 27 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 60 }
        ])
    },
    {
        code: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 13 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 48 }
        ])
    },
    {
        code: 'function foo(bar:string, asdsd:number, asd:any) : void {}',
        output: 'function foo( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 46 }
        ])
    },
    {
        code: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'function (bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 45 }
        ])
    },
    {
        code: 'function (bar:string, asdsd:number, asd:any) : void {}',
        output: 'function ( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 43 }
        ])
    },
    {
        code: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        output: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 47 }
        ])
    },
    {
        code: 'constructor(bar:string, asdsd:number, asd:any) : void {}',
        output: 'constructor( bar:string, asdsd:number, asd:any ) : void {}',
        options: ['always'],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 12 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 45 }
        ])
    },
    {
        code: 'fooa({ bar: "baz" })',
        output: 'foo( { bar: "baz" } )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 19 }
        ])
    },
    {
        code: 'foob( { bar: "baz" } )',
        output: 'foo({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
        ])
    },
    {
        code: 'fooc({ bar: "baz" })',
        output: 'foo( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 19 }
        ])
    },
    {
        code: 'food( { bar: "baz" } )',
        output: 'foo({ bar: "baz" })',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 21 }
        ])
    },
    {
        code: 'foo1( { bar: "baz" })',
        output: 'foo({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foo2( { bar: "baz" })',
        output: 'foo( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 20 }])
    },
    {
        code: 'foo3({ bar: "baz" } )',
        output: 'foo({ bar: "baz" })',
        options: ['always', { exceptions: ['{}'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 20 }])
    },
    {
        code: 'foo4({ bar: "baz" } )',
        output: 'foo( { bar: "baz" } )',
        options: ['never', { exceptions: ['{}'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foo6([ 1, 2 ])',
        output: 'foo( [ 1, 2 ] )',
        options: ['always', { exceptions: ['empty'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 }
        ])
    },
    {
        code: 'foo7( [ 1, 2 ] )',
        output: 'foo([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 15 }
        ])
    },
    {
        code: 'fooq([ 1, 2 ])',
        output: 'foo( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 5 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 13 }
        ])
    },
    {
        code: 'foow( [ 1, 2 ] )',
        output: 'foo([ 1, 2 ])',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 5 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 15 }
        ])
    },
    {
        code: 'fooe([ 1, 2 ] )',
        output: 'foo([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 14 }])
    },
    {
        code: 'foor([ 1, 2 ] )',
        output: 'foo( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'foot( [ 1, 2 ])',
        output: 'foo([ 1, 2 ])',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 5 }])
    },
    {
        code: 'fooy( [ 1, 2 ])',
        output: 'foo( [ 1, 2 ] )',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 14 }])
    },
    {
        code: '(( 1 + 2 ))',
        output: '( ( 1 + 2 ) )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '(( 1 + 2 ))',
        output: '( ( 1 + 2 ) )',
        options: ['always', { exceptions: ['[]'] }],
        errors: expecting([
            { message: MISSING_SPACE_ERROR, line: 0, column: 1 },
            { message: MISSING_SPACE_ERROR, line: 0, column: 10 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        options: ['never'],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '( ( 1 + 2 ) )',
        output: '((1 + 2))',
        options: ['never', { exceptions: ['[]'] }],
        errors: expecting([
            { message: REJECTED_SPACE_ERROR, line: 0, column: 1 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 3 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 10 },
            { message: REJECTED_SPACE_ERROR, line: 0, column: 12 }
        ])
    },
    {
        code: '( ( 1 + 2 ))',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 1 }])
    },
    {
        code: '( (1 + 2))',
        output: '( (1 + 2) )',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 9 }])
    },
    {
        code: '(( 1 + 2 ) )',
        output: '(( 1 + 2 ))',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 11 }])
    },
    {
        code: '((1 + 2) )',
        output: '( (1 + 2) )',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 1 }])
    },
    {
        code: 'var result = ( 1 / ( 1 + 2 ) ) + 3',
        output: 'var result = ( 1 / ( 1 + 2 )) + 3',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 29 }])
    },
    {
        code: 'var result = (1 / (1 + 2)) + 3',
        output: 'var result = (1 / (1 + 2) ) + 3',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'var result = ( 1 / ( 1 + 2)) + 3',
        output: 'var result = ( 1 / ( 1 + 2 )) + 3',
        options: ['always', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 26 }])
    },
    {
        code: 'var result = (1 / (1 + 2)) + 3',
        output: 'var result = (1 / (1 + 2) ) + 3',
        options: ['never', { exceptions: ['()'] }],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'foo\n(\nbar )\n',
        output: 'foo\n(\nbar)\n',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 2, column: 4 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${(1 + 2)})`;',
        options: ['never'],
        errors: expecting([{ message: REJECTED_SPACE_ERROR, line: 0, column: 25 }])
    },
    {
        code: 'var foo = `(bar ${(1 + 2 )})`;',
        output: 'var foo = `(bar ${( 1 + 2 )})`;',
        options: ['always'],
        errors: expecting([{ message: MISSING_SPACE_ERROR, line: 0, column: 19 }])
    }
]);
ruleTester.runTests();

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvcnVsZXMvc3BhY2VJblBhcmVuc1J1bGVUZXN0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsMkNBQTZEO0FBRTdELElBQU0sVUFBVSxHQUFHLElBQUksdUJBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3JELElBQU0sbUJBQW1CLEdBQUcsMENBQTBDLENBQUM7QUFDdkUsSUFBTSxvQkFBb0IsR0FBRyw4Q0FBOEMsQ0FBQztBQUU1RSxtQkFBbUIsTUFBTTtJQUN2QixNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUc7UUFDcEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM5QixNQUFNLENBQUM7Z0JBQ0wsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2dCQUNwQixhQUFhLEVBQUUsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFDakQsV0FBVyxFQUFFLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUM7YUFDaEQsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxVQUFVLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdEMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsd0JBQXdCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdkQsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsNEJBQTRCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDM0QsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDdEQsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbkQsRUFBRSxJQUFJLEVBQUUsMkJBQTJCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDMUQsRUFBRSxJQUFJLEVBQUUsaUNBQWlDLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDaEUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ3JDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN4QyxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNoRCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSx3QkFBd0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUN0RCxFQUFFLElBQUksRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUMzRCxFQUFFLElBQUksRUFBRSwrQkFBK0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRTtJQUM3RCxFQUFFLElBQUksRUFBRSwwQkFBMEIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUd6RCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUMvQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbEQsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDL0MsRUFBRSxJQUFJLEVBQUUsZ0NBQWdDLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDL0QsRUFBRSxJQUFJLEVBQUUsOEJBQThCLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDNUQsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDckQsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDeEQsRUFBRSxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFHckQsRUFBRSxJQUFJLEVBQUUsbUVBQW1FLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbEcsRUFBRSxJQUFJLEVBQUUsaUVBQWlFLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDL0YsRUFBRSxJQUFJLEVBQUUsNkVBQTZFLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDNUcsRUFBRSxJQUFJLEVBQUUsMkVBQTJFLEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFHekcsRUFBRSxJQUFJLEVBQUUsNkRBQTZELEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDNUYsRUFBRSxJQUFJLEVBQUUsMkRBQTJELEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDekYsRUFBRSxJQUFJLEVBQUUsMERBQTBELEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDekYsRUFBRSxJQUFJLEVBQUUsd0RBQXdELEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFHdEYsRUFBRSxJQUFJLEVBQUUsb0RBQW9ELEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7SUFDbkYsRUFBRSxJQUFJLEVBQUUsa0RBQWtELEVBQUUsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFHaEYsRUFBRSxJQUFJLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQzVFLEVBQUUsSUFBSSxFQUFF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QyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2xCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNwRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDcEQsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMzQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2xCLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNyRCxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDckQsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsc0JBQXNCO1FBQzVCLE1BQU0sRUFBRSx1QkFBdUI7UUFDL0IsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUMxQyxNQUFNLEVBQUUsU0FBUyxDQUFDO1lBQ2xCLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNwRCxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUU7U0FDcEQsQ0FBQztLQUNIO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsd0JBQXdCO1FBQzlCLE1BQU0sRUFBRSxxQkFBcUI7UUFDN0IsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsVUFBVSxFQUFFLENB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QUErQjtRQUN2QyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDNUU7SUFDRDtRQUNFLElBQUksRUFBRSxnQ0FBZ0M7UUFDdEMsTUFBTSxFQUFFLGlDQUFpQztRQUN6QyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDbkIsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDM0U7Q0FDRixDQUFDLENBQUM7QUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUMiLCJmaWxlIjoidGVzdC9ydWxlcy9zcGFjZUluUGFyZW5zUnVsZVRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii93b3JrL3dvcmtzcGFjZS90c2xpbnQtZXNsaW50LXJ1bGVzL3NyYyJ9
