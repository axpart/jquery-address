module("Value")

test("should set value", function() {
    $.address.value('/test');

    equals($.address.value(), '/test');
});


module("Path");

test("should set path with empty value", function() {
    $.address.value('');

    $.address.path('test');

    equals($.address.value(), '/test');
    equals($.address.path(), '/test');
});

test("should set path with query", function() {
    $.address.value('/?p=0');

    $.address.path('test');

    equals($.address.value(), '/test?p=0');
    equals($.address.path(), '/test');
});

test("should set path with fragment", function() {
    $.address.value('/#fragment');

    $.address.path('test');

    equals($.address.value(), '/test#fragment');
    equals($.address.path(), '/test');
    equals($.address.fragment(), 'fragment');
});


module("Query");

test("should set query with empty value", function() {
    $.address.value('');

    $.address.queryString('p=0');

    equals($.address.value(), '/?p=0');
    equals($.address.queryString(), 'p=0');
});

test("should set query with path", function() {
    $.address.value('/test');

    $.address.queryString('p=0');

    equals($.address.value(), '/test?p=0');
    equals($.address.path(), '/test');
    equals($.address.queryString(), 'p=0');
});

test("should set query with fragment", function() {
    $.address.value('/#fragment');

    $.address.queryString('p=0');

    equals($.address.value(), '/?p=0#fragment');
    equals($.address.fragment(), 'fragment');
    equals($.address.queryString(), 'p=0');
});


module("Parameter");

test("should set parameter with path", function() {
    $.address.value('/test');

    $.address.parameter('p', 1);

    equals($.address.value(), '/test?p=1');
    equals($.address.queryString(), 'p=1');
    equals($.address.parameter('p'), '1');
});

test("should append additional value to existing parameter", function() {
    $.address.value('/test?p=1');

    $.address.parameter('p', 2, true);

    equals($.address.value(), '/test?p=1&p=2');
    equals($.address.queryString(), 'p=1&p=2');
    equals($.address.parameter('p').toString(), '1,2');
});

test("should override or append values of parameters", function() {
    $.address.value('/test?p=1&p=2');

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


module("Fragment");

test("should set fragment with path", function() {
    $.address.value('/test');

    $.address.fragment('fragment');

    equals($.address.value(), '/test#fragment');
    equals($.address.path(), '/test');
    equals($.address.fragment(), 'fragment');
});

test("should set fragment with path and query", function() {
    $.address.value('/test?p=0');

    $.address.fragment('fragment');
    equals($.address.value(), '/test?p=0#fragment');
    equals($.address.path(), '/test');
    equals($.address.parameter('p'), '0');
    equals($.address.fragment(), 'fragment');
});



QUnit.done = function() {
    $.address.value('/');
};

