/* Copyright (C) 2022 ohmyprogramming <github.com/ohmyprogramming> */
/* Old code - very rusty and fragmented everywhere */

var con = document.getElementById("con");
var con_cursor = document.getElementById("con_cursor");
var input_mode = false; /* Used to allow for key events on document when input_mode is true */

document.addEventListener("keyup", function(e) {
    if (input_mode == false) {
        e.preventDefault();
        return;
    }

    var k = e.key.toLowerCase();

    if (k == "y") {
        con_print(e.key + "\n");
        con.innerHTML = "<span id=\"con_cursor\">█</span>";
        con_cursor = document.getElementById("con_cursor");
        input_mode = false;
        interval2counter = 0;
        table_auto_x = window.innerWidth /  (pwgen_strength * (pwgen_strength / 1.6));
        password_table = generate_passwords(table_auto_x, 10);
        motd_table = "\nGenerating Passwords:\n";
        motd_table += array_to_ascii_table(password_table, pwgen_strength);
motd_table += `

Generate again? [Y/n]: `;
        var motd_table_size = motd_table.length;

        interval2 = setInterval(function() {
            if (interval2counter == motd_table_size) {
                clearInterval(interval2);
                input_mode = true; // Allow confirmation
                return;
            }
            var c = motd_table[interval2counter];
            con_print(c);
            ++interval2counter;
        }, 1000 / 750);
    }

    if (k == "n") {
        con_print(e.key + "\n");
        var motd_crash = pwgen(_rnd()) + "\n";
        motd_crash += pwgen(_rnd()) + "\n";
        motd_crash += pwgen(_rnd()) + "\n";
        motd_crash += pwgen(_rnd()) + "\n";
        motd_crash += pwgen(_rnd()) + "\n";
        motd_crash += pwgen(_rnd()) + "\n\n";
        motd_crash += "SYSTEM FAILURE";
        var motd_crash_size = motd_crash.length;
        input_mode = false;
        interval3 = setInterval(function() {
            if (interval3counter == motd_crash_size) {
                clearInterval(interval3);
                return;
            }
            var c = motd_crash[interval3counter];
            con_print(c);
            ++interval3counter;
        }, 1000 / 240);
    }
});

function _rnd(max = 100) {
    return Math.floor(Math.random() * max);
}

function pwgen(strength = 12) {
    var output = "";
    var size = 0;

    if (0 >= strength)
        strength = 12;

    if (strength > 128)
        strength = 128;

    while (size != strength) {
        var dec = Math.floor(Math.random() * 255);
        if (dec > 0x20 && 0x7F > dec) {
            ++size;
            output += String.fromCharCode(dec);
        }
    }

    return output;
}

function generate_passwords(x = 7, y = 14) {
    x = Math.floor(x);
    y = Math.floor(y);
    var chunks = [];

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            if (typeof chunks[i] == "undefined")
                chunks[i] = [];
            chunks[i][j] = pwgen(pwgen_strength);
        }
    }

    return chunks;
}

function array_to_ascii_table(table = [], max_chunk = 12) {
    var buff = "";
    var y = table.length;
    var x = table[0].length;
    var barlen = x * (max_chunk + 3) - 1;

    buff += '┌' + String('─').repeat(barlen) + '┐';

    for (let j = 0; j < y; j++) {
        buff += "\n";
        for (let i = 0; i < x; i++) {
            if (i == 0) buff += '│ '
            buff += table[j][i] + ' │ ';
        }
    }

    buff += '\n└' + String('─').repeat(barlen) + '┘';
    return buff;
}

function con_print(char = null) {
    if (char == null)
        return;

    var el = document.createElement("span");
    el.innerText = char;
    con.insertBefore(el, con_cursor);
}


var pwgen_strength = 16;

/* These values are computed so that the table columns with on the page width */
/* depending on the inner width of the viewport                               */
var table_auto_x = window.innerWidth /  (pwgen_strength * (pwgen_strength / 1.6));

password_table = generate_passwords(table_auto_x, 10);

motd = `                                                                               
USER logged in\nTime is: `;
motd += (new Date());

motd += `
                                                                              
Welcome to the Password Generator Terminal Interface.
Copyright (C) 2022 ohmyprogramming <github.com/ohmyprogramming>

Generating Passwords:
`;

var motd_size = motd.length;

motd_table = array_to_ascii_table(password_table, pwgen_strength);
motd_table += `

Generate again? [Y/n]: `;
var motd_table_size = motd_table.length;

var interval1 =
    internal2 =
    internal3 =
    internal4 = null;

var interval1counter =
    interval2counter =
    interval3counter =
    interval4counter = 0;

interval1 = setInterval(function() {
    if (interval1counter == motd_size) {
        clearInterval(interval1);
        return;
    }
    var c = motd[interval1counter];
    con_print(c);
    ++interval1counter;
}, 1000 / 120);

setTimeout(function() {
    interval2 = setInterval(function() {
        if (interval2counter == motd_table_size) {
            clearInterval(interval2);
            input_mode = true; // Allow confirmation
            return;
        }
        var c = motd_table[interval2counter];
        con_print(c);
        ++interval2counter;
    }, 1000 / 750);
}, 4500);
