// Linux commands reference — descriptions only, no execution logic.
const LINUX_COMMANDS = [
  // ===== Files & Navigation =====
  {
    name: "ls",
    category: "Files",
    short: "List directory contents.",
    description: "The `ls` command lists files and directories. It is one of the most frequently used commands for exploring the filesystem.",
    syntax: ["ls [options] [path]", "ls -la", "ls -lh /var/log"],
    details: [
      { flag: "-l", text: "Long format with permissions, owner, size and timestamp." },
      { flag: "-a", text: "Include hidden files beginning with a dot." },
      { flag: "-h", text: "Human-readable file sizes (KB, MB, GB)." },
      { flag: "-R", text: "Recursively list subdirectories." }
    ]
  },
  {
    name: "cd",
    category: "Files",
    short: "Change the current working directory.",
    description: "`cd` changes the shell's current directory. With no arguments it returns to the home directory.",
    syntax: ["cd [path]", "cd /etc", "cd ..", "cd ~"],
    details: [
      { flag: "cd ..", text: "Move up one directory level." },
      { flag: "cd -", text: "Switch to the previous directory." },
      { flag: "cd ~", text: "Go to the current user's home directory." }
    ]
  },
  {
    name: "cp",
    category: "Files",
    short: "Copy files and directories.",
    description: "`cp` creates copies of files or directory trees. Use `-r` for recursive directory copying.",
    syntax: ["cp [options] source dest", "cp -r dir1 dir2"],
    details: [
      { flag: "-r", text: "Recursively copy directories." },
      { flag: "-p", text: "Preserve file attributes and timestamps." },
      { flag: "-i", text: "Prompt before overwriting existing files." }
    ]
  },
  {
    name: "mv",
    category: "Files",
    short: "Move or rename files and directories.",
    description: "`mv` relocates a file or directory to a new path, or renames it if the destination is a new name in the same location.",
    syntax: ["mv source dest", "mv old.txt new.txt"],
    details: [
      { flag: "-i", text: "Prompt before overwriting." },
      { flag: "-n", text: "Never overwrite existing files." },
      { flag: "-v", text: "Verbose output showing moves." }
    ]
  },
  {
    name: "rm",
    category: "Files",
    short: "Remove files and directories.",
    description: "`rm` deletes files. Directories require `-r`. This is destructive — there is no built-in trash or undo.",
    syntax: ["rm [options] file", "rm -rf dir"],
    details: [
      { flag: "-r", text: "Recursively delete directories." },
      { flag: "-f", text: "Force removal without prompts." },
      { flag: "-i", text: "Prompt before each removal (safer)." }
    ]
  },
  {
    name: "find",
    category: "Files",
    short: "Search for files in a directory hierarchy.",
    description: "`find` walks a directory tree matching name, size, time, permissions and can execute commands on matches.",
    syntax: ["find [path] [expr]", "find /var -name '*.log'", "find . -size +100M"],
    details: [
      { flag: "-name", text: "Match filename by pattern." },
      { flag: "-type", text: "Filter by file type (f=file, d=directory)." },
      { flag: "-exec", text: "Run a command on each match." },
      { flag: "-mtime", text: "Filter by modification time in days." }
    ]
  },
  {
    name: "grep",
    category: "Text",
    short: "Search text using regular expressions.",
    description: "`grep` prints lines matching a pattern. It supports regex, recursive search and context lines.",
    syntax: ["grep [options] pattern file", "grep -rn 'error' /var/log"],
    details: [
      { flag: "-r", text: "Recursively search directories." },
      { flag: "-n", text: "Show line numbers." },
      { flag: "-i", text: "Case-insensitive matching." },
      { flag: "-v", text: "Invert match (show non-matching lines)." }
    ]
  },
  {
    name: "cat",
    category: "Text",
    short: "Concatenate and display file content.",
    description: "`cat` reads files and prints their contents to stdout. Also used to combine multiple files.",
    syntax: ["cat file", "cat a.txt b.txt > joined.txt"],
    details: [
      { flag: "-n", text: "Number output lines." },
      { flag: "-A", text: "Show non-printing characters." }
    ]
  },
  {
    name: "less",
    category: "Text",
    short: "Page through file content interactively.",
    description: "`less` opens a scrollable viewer for large files. Press `/` to search, `q` to quit.",
    syntax: ["less file", "ps aux | less"],
    details: [
      { flag: "/pattern", text: "Search forward." },
      { flag: "G", text: "Jump to end of file." },
      { flag: "q", text: "Quit the pager." }
    ]
  },
  {
    name: "tail",
    category: "Text",
    short: "Display the last lines of a file.",
    description: "`tail` shows the end of files. With `-f` it follows new writes — essential for watching logs live.",
    syntax: ["tail -n 50 file", "tail -f /var/log/syslog"],
    details: [
      { flag: "-f", text: "Follow file as it grows (live log watching)." },
      { flag: "-n", text: "Show the last N lines." }
    ]
  },

  // ===== Permissions & Users =====
  {
    name: "chmod",
    category: "Permissions",
    short: "Change file permission bits.",
    description: "`chmod` modifies read/write/execute bits using symbolic (u+x) or octal (755) notation.",
    syntax: ["chmod [mode] file", "chmod 755 script.sh", "chmod u+x run.sh"],
    details: [
      { flag: "755", text: "Owner rwx, group rx, others rx." },
      { flag: "644", text: "Owner rw, group r, others r." },
      { flag: "+x", text: "Add execute permission." }
    ]
  },
  {
    name: "chown",
    category: "Permissions",
    short: "Change file owner and group.",
    description: "`chown` assigns a new owner (and optionally group) to a file or recursive tree.",
    syntax: ["chown user:group file", "chown -R www-data:www-data /var/www"],
    details: [
      { flag: "-R", text: "Recursively change ownership." },
      { flag: "user:group", text: "Set owner and group at once." }
    ]
  },
  {
    name: "sudo",
    category: "Permissions",
    short: "Execute a command as another user.",
    description: "`sudo` runs a command with elevated privileges (typically root), governed by `/etc/sudoers`.",
    syntax: ["sudo command", "sudo -u postgres psql"],
    details: [
      { flag: "-u", text: "Run as a specific user." },
      { flag: "-i", text: "Start an interactive root shell." }
    ]
  },

  // ===== Processes & Monitoring =====
  {
    name: "ps",
    category: "Processes",
    short: "Report a snapshot of running processes.",
    description: "`ps` lists active processes. Common form `ps aux` shows all processes with user, CPU and memory usage.",
    syntax: ["ps aux", "ps -ef", "ps aux | grep nginx"],
    details: [
      { flag: "a", text: "Show processes for all users." },
      { flag: "u", text: "User-oriented format." },
      { flag: "x", text: "Include processes without a terminal." }
    ]
  },
  {
    name: "top",
    category: "Processes",
    short: "Live view of system processes.",
    description: "`top` displays real-time CPU, memory and process statistics. `htop` is a common enhanced alternative.",
    syntax: ["top", "top -u nginx"],
    details: [
      { flag: "M", text: "Sort by memory usage." },
      { flag: "P", text: "Sort by CPU usage." },
      { flag: "k", text: "Kill a process by PID." }
    ]
  },
  {
    name: "kill",
    category: "Processes",
    short: "Send a signal to a process.",
    description: "`kill` delivers signals to a process, most commonly `SIGTERM` (15) to request graceful shutdown.",
    syntax: ["kill PID", "kill -9 PID", "kill -HUP PID"],
    details: [
      { flag: "-15", text: "SIGTERM — request graceful termination." },
      { flag: "-9", text: "SIGKILL — force immediate termination." },
      { flag: "-HUP", text: "SIGHUP — often reloads configuration." }
    ]
  },
  {
    name: "systemctl",
    category: "Processes",
    short: "Control systemd services and targets.",
    description: "`systemctl` manages systemd units — services, sockets, timers, targets. Core to modern Linux administration.",
    syntax: ["systemctl status nginx", "systemctl restart nginx", "systemctl enable nginx"],
    details: [
      { flag: "start/stop", text: "Start or stop a service." },
      { flag: "status", text: "Show unit state and recent logs." },
      { flag: "enable", text: "Auto-start at boot." }
    ]
  },

  // ===== Networking =====
  {
    name: "curl",
    category: "Network",
    short: "Transfer data from URLs.",
    description: "`curl` performs HTTP/HTTPS, FTP and other protocol requests — used to test APIs and download files.",
    syntax: ["curl https://api.example.com", "curl -X POST -d '{}' url"],
    details: [
      { flag: "-X", text: "Specify HTTP method (GET, POST…)." },
      { flag: "-H", text: "Add a request header." },
      { flag: "-d", text: "Send a request body." },
      { flag: "-o", text: "Write output to a file." }
    ]
  },
  {
    name: "ss",
    category: "Network",
    short: "Inspect socket statistics.",
    description: "`ss` shows network connections and listening ports. It replaces the older `netstat`.",
    syntax: ["ss -tuln", "ss -tulpn"],
    details: [
      { flag: "-t", text: "TCP sockets." },
      { flag: "-u", text: "UDP sockets." },
      { flag: "-l", text: "Listening sockets only." },
      { flag: "-p", text: "Show owning process." }
    ]
  },
  {
    name: "ping",
    category: "Network",
    short: "Test reachability with ICMP echo.",
    description: "`ping` sends ICMP echo requests to test network reachability and measure round-trip time.",
    syntax: ["ping host", "ping -c 4 8.8.8.8"],
    details: [
      { flag: "-c", text: "Send a fixed count then exit." },
      { flag: "-i", text: "Interval between packets." }
    ]
  },
  {
    name: "ssh",
    category: "Network",
    short: "Open a secure remote shell.",
    description: "`ssh` connects to remote hosts over an encrypted channel. Also supports tunneling and key-based auth.",
    syntax: ["ssh user@host", "ssh -i key.pem user@ip"],
    details: [
      { flag: "-i", text: "Use a specific private key." },
      { flag: "-L", text: "Local port forwarding (tunnel)." },
      { flag: "-p", text: "Non-default SSH port." }
    ]
  },
  {
    name: "rsync",
    category: "Network",
    short: "Efficient file synchronization.",
    description: "`rsync` syncs files locally or over SSH, transferring only changed blocks — ideal for backups.",
    syntax: ["rsync -av src/ user@host:/dest/", "rsync -avz --delete src/ dst/"],
    details: [
      { flag: "-a", text: "Archive mode (preserve attributes)." },
      { flag: "-v", text: "Verbose output." },
      { flag: "-z", text: "Compress during transfer." },
      { flag: "--delete", text: "Remove files missing at source." }
    ]
  },

  // ===== Disk & Package =====
  {
    name: "df",
    category: "Disk",
    short: "Report filesystem disk usage.",
    description: "`df` shows mounted filesystems and their used/free space.",
    syntax: ["df -h", "df -hT"],
    details: [
      { flag: "-h", text: "Human-readable sizes." },
      { flag: "-T", text: "Show filesystem type." }
    ]
  },
  {
    name: "du",
    category: "Disk",
    short: "Estimate file and directory space usage.",
    description: "`du` reports disk usage of files and directories. Combine with `sort` to find large directories.",
    syntax: ["du -sh *", "du -ah /var | sort -h | tail"],
    details: [
      { flag: "-s", text: "Summary only." },
      { flag: "-h", text: "Human-readable sizes." },
      { flag: "-a", text: "Include files, not just directories." }
    ]
  },
  {
    name: "apt",
    category: "Packages",
    short: "Debian/Ubuntu package manager.",
    description: "`apt` installs, upgrades and removes Debian packages. `apt-get` is its script-friendly sibling.",
    syntax: ["apt update", "apt install nginx", "apt remove nginx"],
    details: [
      { flag: "update", text: "Refresh package index." },
      { flag: "upgrade", text: "Install available upgrades." },
      { flag: "install", text: "Install a package." }
    ]
  },
  {
    name: "dnf",
    category: "Packages",
    short: "Fedora/RHEL package manager.",
    description: "`dnf` resolves dependencies and manages RPM packages on Fedora, RHEL, CentOS Stream and derivatives.",
    syntax: ["dnf install nginx", "dnf upgrade", "dnf search httpd"],
    details: [
      { flag: "install", text: "Install a package." },
      { flag: "upgrade", text: "Upgrade packages." },
      { flag: "list", text: "List installed/available packages." }
    ]
  },

  // ===== Compression & Misc =====
  {
    name: "tar",
    category: "Compression",
    short: "Archive and extract files.",
    description: "`tar` bundles files into an archive and can compress with gzip/bzip2/xz.",
    syntax: ["tar -czf out.tar.gz dir/", "tar -xzf out.tar.gz"],
    details: [
      { flag: "-c", text: "Create archive." },
      { flag: "-x", text: "Extract archive." },
      { flag: "-z", text: "Gzip compression." },
      { flag: "-f", text: "Archive filename." }
    ]
  },
  {
    name: "crontab",
    category: "Scheduling",
    short: "Manage scheduled cron jobs.",
    description: "`crontab` edits the per-user cron table, running commands on a minute/hour/day schedule.",
    syntax: ["crontab -e", "crontab -l"],
    details: [
      { flag: "-e", text: "Edit the current user's cron table." },
      { flag: "-l", text: "List scheduled jobs." },
      { flag: "*/5 * * * *", text: "Run every five minutes." }
    ]
  },
  {
    name: "journalctl",
    category: "Logs",
    short: "Query the systemd journal.",
    description: "`journalctl` reads structured systemd logs with filtering by unit, time and priority.",
    syntax: ["journalctl -u nginx", "journalctl -f", "journalctl --since '1 hour ago'"],
    details: [
      { flag: "-u", text: "Filter by systemd unit." },
      { flag: "-f", text: "Follow new entries live." },
      { flag: "--since", text: "Time-range filter." }
    ]
  },
  {
    name: "awk",
    category: "Text",
    short: "Pattern-scanning and reporting language.",
    description: "`awk` processes text line by line, splitting into fields and applying expressions — great for extraction and reports.",
    syntax: ["awk '{print $1}' file", "awk -F: '{print $1}' /etc/passwd"],
    details: [
      { flag: "-F", text: "Set the field separator." },
      { flag: "$1", text: "Reference the first field." },
      { flag: "NR", text: "Current line number." }
    ]
  },
  {
    name: "sed",
    category: "Text",
    short: "Stream editor for text transformation.",
    description: "`sed` performs substitutions and edits on a stream. The `s///` command is the most common.",
    syntax: ["sed 's/old/new/g' file", "sed -i 's/a/b/' file"],
    details: [
      { flag: "-i", text: "Edit files in place." },
      { flag: "s///g", text: "Global substitution." },
      { flag: "-n", text: "Suppress default output." }
    ]
  }
];