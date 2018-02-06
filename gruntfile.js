//-----------------------------------------------------
//
// Author: Daeren
// Site: 666.io
//
//-----------------------------------------------------

"use strict";

//-----------------------------------------------------

module.exports = function(grunt) {
    require("load-grunt-tasks")(grunt);
    require("time-grunt")(grunt);

    grunt.initConfig({
        wrap: {
            basic: {
                src: ["index.js"],
                dest: "build/xeeES6.js",
                options: {
                    wrapper: [
                        `const XEE = (function(module) {`,

                        "return EE; })({});"
                    ]
                }
            }
        },

        babel: {
            options: {
                sourceMap: true,
                sourceMapTarget: "build/xee.min.js.map",
                presets: ["es2015", "es2016", "es2017"]
            },
            dist: {
                files: {
                    "build/xee.js": "build/xeeES6.js"
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    "build/xee.min.js": ["build/xee.js"]
                }
            }
        }
    });

    grunt.registerTask("default", ["wrap", "babel", "uglify"]);
};