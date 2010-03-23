test("Value test", function() {
    $.address.value('/test');
    equals($.address.value(), '/test');
});

test("Query test", function() {
    $.address.queryString('p=0');
    equals($.address.value(), '/test?p=0');
    equals($.address.path(), '/test');
    equals($.address.queryString(), 'p=0');
});

test("Parameter test", function() {
    $.address.parameter('p', 1);
    equals($.address.value(), '/test?p=1');
    equals($.address.queryString(), 'p=1');
    equals($.address.parameter('p'), '1');
});

test("Parameter test", function() {
    $.address.parameter('p', 2, true);
    equals($.address.value(), '/test?p=1&p=2');
    equals($.address.queryString(), 'p=1&p=2');
    equals($.address.parameter('p').toString(), '1,2');
});

test("Parameter test", function() {
    $.address.autoUpdate(false)
        .queryString('')
        .parameter('p', 1, true)
        .parameter('p', 2)
        .parameter('p', 3, true)
        .parameter('s', 1)
        .parameter('s', 2, true)
        .parameter('s', 3)
        .parameter('t', 0)
        .parameter('t', null)
        .autoUpdate(true)
        .update();
    equals($.address.value(), '/test?p=2&p=3&s=3');
    equals($.address.parameter('p').toString(), '2,3');
    equals($.address.parameter('s').toString(), 3);
    equals($.address.parameterNames().toString(), 'p,s');
});

test("Fragment test with params", function() {
    $.address.fragment('fragment');
    equals($.address.value(), '/test?p=2&p=3&s=3#fragment');
    equals($.address.path(), '/test');
    equals($.address.parameter('p').toString(), '2,3');
    equals($.address.parameter('s').toString(), 3);
    equals($.address.parameterNames().toString(), 'p,s');
    equals($.address.fragment(), 'fragment');
});

test("Fragment test", function() {
    $.address.value('/test');
    $.address.fragment('fragment');
    equals($.address.value(), '/test#fragment');
    equals($.address.path(), '/test');
    equals($.address.fragment(), 'fragment');
});

QUnit.done = function() {
    $.address.value('/');
};

