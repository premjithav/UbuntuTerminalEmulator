$(function() {
//alert(Math.round((new Date('2014 04 07') - new Date())/(1000*60*60*24)));
//alert(Math.round((parseISO8601("2014-04-07")-new Date())/(1000*60*60*24)));
function parseISO8601(dateStringInRange) {
    var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
        date = new Date(NaN), month,
        parts = isoExp.exec(dateStringInRange);

    if(parts) {
      month = +parts[2];
      date.setFullYear(parts[1], month - 1, parts[3]);
      if(month != date.getMonth() + 1) {
        date.setTime(NaN);
      }
    }
    return date;
  }
var API_PREFIX = 'https://api.github.com/repos/premjithav/personal/git';
var GitHub = new (function() {
    this.fs = new Object;
    this.loaded = false;
    this.stack = new Array;

    this.getCurrentPath = function(){
        if(this.stack.length == 0) 
            return '~/';
        return this.stack.join('/')
    },    
    this.getCurrentWorkingDirectory = function() {
        if(this.stack.length == 0) 
            return this.fs;
        
        var fs = this.fs
        for(var i in this.stack) {
            fs = fs[this.stack[i]];
        }
        return fs;
    };
        
    var self = this;    
    $.getJSON(API_PREFIX + '/refs/heads/master', function(data, textStatus, jqXHR){
    //$.getJSON('data/master.json', function(data, textStatus, jqXHR){
        var sha = data.object.sha;
        $.getJSON(API_PREFIX + '/trees/'+sha+'?recursive=1', function(data, textStatus, jqXHR){
        //$.getJSON('data/tree.json', function(data, textStatus, jqXHR){
            for(i in data.tree) {
                var item = data.tree[i];                
                var paths = item.path.split('/');   
                
                var fs = self.fs;                
                for(var i=0; i< paths.length; i++) {
                    var path = paths[i];                    
                    
                    if(!fs.hasOwnProperty(path)) {
                       fs[path] = new Object;
                    } else {
                       fs = fs[path]
                    }
                       
                    if (i == paths.length-1) {
                        item.path = path;
                        fs[path] = item;
                    }
                }
            }
            self.loaded = true;
        });
    });
})();
   
    var package_install_message_pre = "\
Reading package lists... Done\
\nBuilding dependency tree\
\nReading state information... Done\
\nThe following NEW packages will be installed:\
\n   libwedding libinvitation libdetails liblocation librsvp libhelp\
\n0 upgraded, 6 newly installed, 0 to remove and 0 not upgraded.\
\nNeed to get 4.6 MB of archives.\
\nAfter this operation, 10.3 MB of additional disk space will be used.\
\nGet:1 http://premjith.in/ubuntu/ precise-updates/universe libwedding i386 1.0.0-0ubuntu0.12.04.1 [616 B]\
\nGet:2 http://premjith.in/ubuntu/ precise-updates/universe libinvitation i386 1.0.0-0ubuntu0.12.04.1 [116 B]\
\nGet:3 http://premjith.in/ubuntu/ precise-updates/universe libdetails i386 1.0.0-0ubuntu0.12.04.1 [880 B]\
\nGet:4 http://premjith.in/ubuntu/ precise-updates/universe liblocation i386 1.0.0-0ubuntu0.12.04.1 [316 B]\
\nGet:5 http://premjith.in/ubuntu/ precise-updates/universe librsvp i386 1.0.0-0ubuntu0.12.04.1 [2,617 B]\
\nGet:6 http://premjith.in/ubuntu/ precise-updates/universe libhelp i386 1.0.0-0ubuntu0.12.04.1 [220 B]\
\nFetched 4.6 MB in 1min 9s (232 kB/s)\
\n ";
    var package_install_message_post = "\
\nProcessing triggers for hicolor-icon-theme ...\
\nProcessing triggers for man-db ...\
\nProcessing triggers for bamfdaemon ...\
\nRebuilding /usr/share/applications/bamf.index...\
\nProcessing triggers for desktop-file-utils ...\
\nProcessing triggers for gnome-menus ...\
\nSetting up libwedding (1.0.0-0) ...\
\nSetting up libinvitation (1.0.0-0) ...\
\nSetting up libdetails (1.0.0-0) ...\
\nSetting up liblocation (1.0.0-0) ...\
\nSetting up librsvp (1.0.0-0) ...\
\nSetting up libhelp (1.0.0-0) ...\
\nProcessing triggers for libc-bin ...\
\nldconfig deferred processing now taking place\
\n\
\n[[b;#C94D18;]************* Instructions *************]\
\n\
\nSuccessfully installed wedding package\
\n    Go ahead and type [[b;#0099CC;]wedding] on the command prompt to see the\
\nlist of commands available with it.\
\n\
\nWe love you!\
\n\
\n[[b;#b58900;]Amrutha and Premjith]\
\n\
\n[[b;#C94D18;]***************************************]\
\n    ";
    var prompt = "[[b;#C94D18;]root]@[[b;#0099CC;]wedding]";
    var days_left = Math.round((parseISO8601("2014-04-07")-new Date())/(1000*60*60*24));
    var wedding_url = "";
    var rsvp_url = "";
	var train_avail = "http://erail.in/?T=TVC::CLT";
    var venue_address = "\
---------------------\
\n-----------------\
\n---------------\
\n------------\
    "
    var ganesha = "\
\n                              _.!._             \
\n                             /O*@*O\\           \
\n                           <\\@(_)@/>           \
\n                   ,;,   .--;`     `;--.   ,    \
\n                   O@O_ /   |d     b|   \\ _hnn \
\n                   | `/ \\   |       |   / \\` |\
\n                   &&&&  :##;\\     /;##;  &&&& \
\n                   |  \\ / `##/|   |##'  \\ /  |\
\n                   \\   %%`</|   |#'`%%   / \
\n                    '._|_ \\   |   |'  / _|_.'  \
\n                      _/  /   \\   \\   \\  \\  \
\n                     / (\\(     '.  '-._&&&&    \
\n                    (  ()##,    o'--.._`\\-)    \
\n                     '-():`##########'()()()    \
\n                      /:::::/()`Y`()\\:::::\\   \
\n                      \\::::( () | () )::::/    \
\n                       `\"\"\"`\\().'.()/'\"\"\"`     \
\n                       \
  ";
  var invitation_pre = "\
\n[[b;#C94D18;]********************* Wedding invitation *********************]\
  ";
  var prem_weds_amrutha = "\
\n8888888b.                                    d8b d8b 888    888     \
\n888   Y88b                                   Y8P Y8P 888    888     \
\n888    888                                           888    888     \
\n888   d88P 888d888  .d88b.  88888b.d88b.    8888 888 888888 88888b. \
\n8888888P   888P    d8P  Y8b 888  888  88b    888 888 888    888  88b\
\n888        888     88888888 888  888  888    888 888 888    888  888\
\n888        888     Y8b.     888  888  888    888 888 Y88b.  888  888\
\n888        888       Y8888  888  888  888    888 888   Y888 888  888\
\n                                             888                    \
\n                                            d88P                    \
\n                                          888P                      \
\n								[[b;#C94D18;]Weds]                	  \
\n       d8888                                888    888              \
\n      d88888                                888    888              \
\n     d88P888                                888    888              \
\n    d88P 888 88888b.d88b.  888d888 888  888 888888 88888b.   8888b. \
\n   d88P  888 888  888  88b 888P    888  888 888    888  88b      88b\
\n  d88P   888 888  888  888 888     888  888 888    888  888 .d888888\
\n d8888888888 888  888  888 888     Y88b 888 Y88b.  888  888 888  888\
\nd88P     888 888  888  888 888       Y88888   Y888 888  888  Y888888\
\n\n";
  var invitation_post = "\
\nHi,\
\n\
\nWe are getting married on 7 April 14. It will \
\nbe a great pleasure for us to have your presence  \
\nin the wedding ceremony.                          \
\n                                                  \
\nEvent schedule:                                   \
\n\
\n               \
\n 10:45  : Groom's party departs for Wedding Ceremony @ Siva Temple\
\n 11:15  : Muhurtham                  \
\n\
\nPlan your trip at the earliest ! Only [[b;#cb4b16;]" + days_left + "] days left.   \
\n\
  ";
    var wedding_help = "\
Commands: \
\n\t[[b;#cb4b16;]wedding invitation]      [[b;#b58900;]# Your invitation card is inside this envelope] \
\n\t[[b;#cb4b16;]wedding bride]           [[b;#b58900;]# Few words about the bride] \
\n\t[[b;#cb4b16;]wedding groom]           [[b;#b58900;]# Few words about the groom] \
\n\t[[b;#cb4b16;]wedding location]        [[b;#b58900;]# Google maps link to the wedding venue] \
\n\t[[b;#cb4b16;]wedding rsvp]            [[b;#b58900;]# RSVP for the event]\
\n\t[[b;#cb4b16;]list trains]             [[b;#b58900;]# List of Railway stations and Trains]\
  ";
    var bride = "\
\n[[b;#C94D18;]************* Bride *************]\
\n\
\nAmrutha, a Teacher by profession, has also a liking for Dance and Travel\
\n\
  ";
    var groom = "\
\n[[b;#C94D18;]************* Groom *************]\
\n\
\nPremjith, an Engineer by profession, has also a liking for Programming, Travelling, Hiking and Photography\
\ngithub - https://github.com/premjithav \
\n\
  ";
    var rsvp = "\
\nYou can RSVP to the event by sending an email to\
\nPremjith (*********@****.com)\
  ";
	var staton_msg ="\
	Nearby Railway stations\
	\n1. *********\
	\n2. *********\
	";
    var you_are_late = "\
Sorry, you are slightly late for attending the event. \
\nPremjith and Amrutha have already got married on 7th April 2014\
\nThankyou.\
\n  "
    if (days_left >= 0) {
      you_are_late = ''
    }
    var greetings = you_are_late + prem_weds_amrutha + "\
\n\nWelcome to Amrutha and Premjith's wedding website. In order to retrieve your \
\ninvitation, first install wedding package using [[b;#0099CC;]sudo apt-get install wedding] command.\
\nOnce the package is installed, type [[b;#0099CC;]wedding] in the terminal to see the list of\
\navailable commands. \
\nPress [[b;#0099CC;]enter (↩)] to install the package on this terminal.\
\n  ";
   
    var print_package = '';

    function print_slowly(term, paragraph, callback) {
      var foo, i, lines;
      lines = paragraph.split("\n");
      term.pause();
      i = 0;
      foo = function(lines) {
        return setTimeout((function() {
          if (i < lines.length -1) {
            term.echo(lines[i]);
            i++;
            return foo(lines);
          } else {
            term.resume();
            return callback();
          }
        }), 500);
      };
      return foo(lines);
    };
	
    function require_command(command_regex, terminal_history) {
      var executed = false;
      $.each(terminal_history, function(index, value){
        if (command_regex.test(value)) {
          executed = true
        }
      });
      return executed;
        
    }
    var package_install_regex = /sudo +apt-get +install +wedding */ig;

    // Handle package command
    function package(inputs, term){
      // No second argument
      if (!inputs[1]) {
        term.echo(print_package);
      } else if (inputs[1] === 'apt-get' && inputs[2] === 'install' && inputs[3] === 'wedding') {
        print_slowly(term, package_install_message_pre, function(){
          term.echo(package_install_message_post)
        });
      } else {
        term.echo(inputs.join(" ") + " is not a valid command")
      }
    }
	
	// Handle wedding command
    function list(inputs, term){
		if (!inputs[1]) {
        term.echo(wedding_help);
      }else if (inputs[1] === "trains") {
        term.echo(staton_msg)
        term.push(function(command, term) {
          window.open(
              train_avail,
              '_blank'
          );
          term.pop();
        }, {
          prompt: 'Please press [[b;#0099CC;]enter (↩)] to see the list of trains to wedding place',
          greetings: null
        });
      } else {
        term.error(inputs.join(" ") + " is not a valid command")
      }
	}

    // Handle wedding command
    function wedding(inputs, term){
      if (!inputs[1]) {
        term.echo(wedding_help);
      } else if (inputs[1] === "bride") {
        term.echo(bride);
      } else if (inputs[1] === "groom") {
        term.echo(groom)
      } else if (inputs[1] === "invitation") {
        term.echo("[[;#e5c665;]"+ganesha+ "]");
        term.echo(invitation_pre);
        term.pause();
        setTimeout(function(){
          term.resume();
          term.echo(prem_weds_amrutha);
          term.pause();
          setTimeout(function(){
            term.resume();
            term.echo(invitation_post);
          }, 500)
        }, 1200)
        
      } else if (inputs[1] === "location") {
        term.echo(venue_address);
        term.echo(wedding_url);
        term.push(function(command, term) {
          if (/y(es){0,1}/.test(command)) {
            window.open(
              wedding_url,
              '_blank'
            );
          }
          term.pop();
        }, {
          prompt: 'Do you want to open this link in the browser? (yes/no) ',
          greetings: null
        });
      } else if (inputs[1] === "rsvp") {
        term.echo(rsvp)
        term.push(function(command, term) {
          window.open(
              rsvp_url,
              '_blank'
          );
          term.pop();
        }, {
          prompt: 'alternatively send me a tweet in a new window when you press [[b;#0099CC;]enter (↩)]',
          greetings: null
        });
      } else {
        term.error(inputs.join(" ") + " is not a valid command")
      }
    }

    // Main interpreter function
    function interpreter(input, term) {
      var command, inputs;
      inputs = input.split(/ +/)
      command = inputs[0];
      if (command === "sudo") {
        package(inputs, term);
      } else if (command === "wedding" || command === "help" ) {
        window.terminal = term;
        if (require_command(package_install_regex, term.history().data())) {
          wedding(inputs, term);
        } else {
          term.error('Please install the package first by executing\nsudo apt-get install wedding');
        }
      }
	  else if(command == "list")
	  {
		if (require_command(package_install_regex, term.history().data())) {
          list(inputs, term);
        } else {
          term.error('Please install the package first by executing\nsudo apt-get install wedding');
        }
	  }
	  else if (/(cd)|(ls)|(cat)/.test(command)) {
		if(command == "ls")
		{
			var wd = GitHub.getCurrentWorkingDirectory();
			for(i in wd) {
				if(typeof wd[i] == 'object') {
					var item = wd[i];
					term.echo(item.mode+'\t' + (item.type=='tree'?'[[b;#44D544;]'+item.path+']':item.path));
				}
			}
		}
		else if(command == "cd")
		{
			path = inputs[1];
			 if(path == '..') {
				GitHub.stack.pop();
				return;
			}        
			var wd = GitHub.getCurrentWorkingDirectory();
			var item = wd[path]
			if(!item) {
				term.error("cd: " + path + ": No such file or directory");
			} else if(item.type != 'tree') {
				term.error("cd: " + path  + ": Not a directory");
			} else {
				GitHub.stack.push(path);
			}
		}
		else if(command == "cat")
		{
			path = inputs[1];
			 var wd = GitHub.getCurrentWorkingDirectory();
			var item = wd[path];
			if(!item) {
				term.error("cat: " + path + ": No such file or directory");
			} else if(item.type == 'tree') {
				term.error("cat: " + path  + ": Is a directory");
			} else {				
				term.pause();
				$.getJSON(item.url, function(data, textStatus, jqXHR){
					var content = data.content.trim()
					if(data.encoding == 'base64')
						content = decode64(content);
					term.echo(content); 
					term.resume();
				});
			}
		}		
      } else if (/which +wedding/.test(input)) {
        if (require_command(package_install_regex, term.history().data())) {
          term.echo("/usr/bin/wedding");
        } // else do nothing
      } else if (/whoami/.test(input)) {
        term.echo("root");
      } else if (command.length === 0) {
        // do nothing
      } else {
        term.error(command + " is not a valid command");
      }
    }

    $('body').terminal( interpreter, {
      prompt: function(p){
            var path = '~'
            if(GitHub.stack.length > 0) {
                for(i in GitHub.stack) {
                    path+= '/';
                    path+= GitHub.stack[i]
                }
            }
            p(prompt + ":" + path + "# ");
        },
      name: 'wedding',
      greetings: greetings,
      height: 600,
      onInit: function(term){
        term.insert("sudo apt-get install wedding");
        term.history().clear();
      },
      completion: function(term, string, callback){
        callback(['sudo apt-get install wedding',
          'wedding invitation',
          'wedding location',
		  'list trains',
          'wedding groom',
          'wedding rsvp',
          'wedding bride']);
      },
      tabcompletion: true
    });

});
