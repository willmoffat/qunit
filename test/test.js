test("module without setup/teardown (default)", function() {
	expect(1);
	ok(true);
});

test("expect in test", 3, function() {
	ok(true);
	ok(true);
	ok(true);
});

test("expect in test", 1, function() {
	ok(true);
});

module("setup test", {
	setup: function() {
		ok(true);
	}
});

test("module with setup", function() {
	expect(2);
	ok(true);
});

module("setup/teardown test", {
	setup: function() {
		window.fail = true;
		ok(true);
	},
	teardown: function() {
		delete window.fail;
		ok(true);
	}
});

test("module with setup/teardown", function() {
	expect(3);
	ok(true);
});

module("setup/teardown test 2");

test("module without setup/teardown", function() {
	expect(1);
	ok(true);
});

var state;

module("teardown and stop", {
	teardown: function() {
		equals(state, "done", "Test teardown.");
	}
});

test("teardown must be called after test ended", function() {
	
	expect(1);
	stop();
	setTimeout(function() {
		state = "done";
		start();
	}, 13);
});

module("asyncTest");

asyncTest("asyncTest", function() {
	expect(2);
	ok(true);
	setTimeout(function() {
		state = "done";
		ok(true);
		start();
	}, 13);
});

asyncTest("asyncTest", 2, function() {
	ok(true);
	setTimeout(function() {
		state = "done";
		ok(true);
		start();
	}, 13);
});

module("save scope", {
	setup: function() {
		this.foo = "bar";
	},
	teardown: function() {
		same(this.foo, "bar");
	}
});
test("scope check", function() {
	expect(2);
	same(this.foo, "bar");
});
