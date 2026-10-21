// Cloud computing components reference — descriptions only.
const CLOUD_COMMANDS = [
  {
    name: "Virtual Machine (VM)",
    category: "Cloud",
    cloud: true,
    short: "Isolated compute instance with its own OS.",
    description: "A Virtual Machine emulates a complete computer including CPU, memory, disk and network. It runs its own guest OS on top of a hypervisor, providing strong isolation between tenants. VMs are the foundational unit of IaaS clouds (AWS EC2, GCP Compute Engine, Azure VMs).",
    syntax: [
      "Create: cloud provider console / CLI",
      "Lifecycle: provision → boot → run → stop → terminate",
      "Common CLI: aws ec2 run-instances, gcloud compute instances create"
    ],
    details: [
      { flag: "vCPU / RAM", text: "Virtualized CPU cores and memory assigned to the instance." },
      { flag: "vNIC", text: "Virtual network interface attached to a subnet." },
      { flag: "vDisk", text: "Virtual block storage (EBS, persistent disk)." },
      { flag: "Image", text: "Base OS template (AMI, image family)." },
      { flag: "Snapshot", text: "Point-in-time copy of disk state for backup/restore." }
    ]
  },
  {
    name: "Hypervisor",
    category: "Cloud",
    cloud: true,
    short: "Software layer that runs and isolates VMs.",
    description: "A hypervisor (Virtual Machine Monitor) creates and manages virtual machines, allocating physical CPU, memory and devices to guests. Type 1 (bare-metal) hypervisors like KVM, Xen and ESXi run directly on hardware; Type 2 (hosted) like VirtualBox run atop a host OS.",
    syntax: [
      "Type 1: KVM, Xen, VMware ESXi, Microsoft Hyper-V",
      "Type 2: VirtualBox, VMware Workstation, QEMU (userspace)",
      "API: libvirt (virsh), cloud-init for guest bootstrap"
    ],
    details: [
      { flag: "vCPU scheduling", text: "Maps guest cores to physical cores with time-sharing." },
      { flag: "Memory ballooning", text: "Reclaims unused guest memory under pressure." },
      { flag: "vSwitch", text: "Virtual switching between guest NICs and physical NICs." },
      { flag: "Live migration", text: "Move a running VM to another host with minimal downtime." },
      { flag: "Snapshots", text: "Capture and roll back VM state (memory + disk)." }
    ]
  },
  {
    name: "Load Balancer",
    category: "Cloud",
    cloud: true,
    short: "Distributes traffic across healthy backends.",
    description: "A load balancer fronts a pool of servers and spreads incoming requests using algorithms such as round-robin, least-connections or hashing. It performs health checks and removes unhealthy targets. Cloud LBs (AWS ALB/NLB, GCP LB, Azure LB) scale automatically.",
    syntax: [
      "Algorithms: round-robin, least-conn, IP hash, weighted",
      "Layers: L4 (TCP/UDP) and L7 (HTTP/HTTPS, path/host routing)",
      "Examples: HAProxy, NGINX, Envoy, AWS ELB"
    ],
    details: [
      { flag: "Health check", text: "Periodic probes to detect and eject failing backends." },
      { flag: "Sticky sessions", text: "Route a client consistently using cookies or IP hash." },
      { flag: "SSL termination", text: "Offload TLS decryption at the balancer." },
      { flag: "Auto-scaling", text: "Add/remove backends based on load metrics." },
      { flag: "Connection draining", text: "Gracefully complete in-flight requests before removal." }
    ]
  },
  {
    name: "Message Broker",
    category: "Cloud",
    cloud: true,
    short: "Asynchronous messaging between services.",
    description: "A broker decouples producers and consumers via queues or publish/subscribe topics. It buffers messages, guarantees delivery semantics, and enables event-driven architectures. Popular brokers include RabbitMQ, Apache Kafka, AWS SQS/SNS and Google Pub/Sub.",
    syntax: [
      "Patterns: queue (point-to-point), topic (pub/sub)",
      "Delivery: at-most-once, at-least-once, exactly-once",
      "Examples: RabbitMQ, Kafka, NATS, SQS, Pub/Sub"
    ],
    details: [
      { flag: "Producer", text: "Publishes messages to an exchange or topic." },
      { flag: "Consumer", text: "Subscribes and processes messages, often in groups." },
      { flag: "Queue", text: "Buffers messages between producer and consumer." },
      { flag: "Acknowledgement", text: "Consumer confirms receipt to allow message removal." },
      { flag: "Dead-letter queue", text: "Parking area for messages that repeatedly fail." },
      { flag: "Retention", text: "How long messages or event logs are stored." }
    ]
  },
  {
    name: "Object Storage",
    category: "Cloud",
    cloud: true,
    short: "Scalable key-value storage for blobs.",
    description: "Object storage (S3, GCS, Azure Blob) stores arbitrary files as objects in flat buckets, addressed by key. It offers virtually unlimited scalability, versioning and lifecycle policies, and is accessed over HTTP APIs rather than a filesystem.",
    syntax: [
      "Buckets and objects: bucket-name/key",
      "APIs: S3 API, GCS JSON API, Azure Blob REST",
      "CLIs: aws s3, gsutil, az storage"
    ],
    details: [
      { flag: "Bucket", text: "Container for objects; namespace-scoped." },
      { flag: "Object", text: "Blob plus metadata, addressed by key." },
      { flag: "Versioning", text: "Retain previous versions of an object." },
      { flag: "Lifecycle", text: "Auto-transition or expire objects by age." },
      { flag: "Presigned URL", text: "Time-limited access link to a private object." }
    ]
  },
  {
    name: "Virtual Network",
    category: "Cloud",
    cloud: true,
    short: "Isolated software-defined networking.",
    description: "Cloud VPCs/VNets provide logically isolated networks with subnets, routing tables, security groups and NAT gateways. They let you define topology programmatically and connect to on-premises via VPN or dedicated links.",
    syntax: [
      "VPC / VNet → subnets → route tables",
      "Security: security groups (stateful), NACLs (stateless)",
      "Connectivity: VPN, peering, transit gateway"
    ],
    details: [
      { flag: "Subnet", text: "CIDR range in a single availability zone." },
      { flag: "Route table", text: "Rules directing traffic to gateways or peers." },
      { flag: "Security group", text: "Instance-level allow rules, stateful." },
      { flag: "NAT gateway", text: "Outbound internet for private subnets." },
      { flag: "VPC peering", text: "Private connectivity between two VPCs." }
    ]
  },
  {
    name: "Container Orchestrator",
    category: "Cloud",
    cloud: true,
    short: "Schedules and scales containerized workloads.",
    description: "Orchestrators like Kubernetes manage container lifecycles across a cluster — scheduling pods, restarting failures, scaling replicas, and exposing services. They provide declarative control via manifests and controllers.",
    syntax: [
      "Resources: Pod, Deployment, Service, Ingress, ConfigMap",
      "CLI: kubectl apply -f manifest.yaml",
      "Scaling: HPA based on CPU/memory/custom metrics"
    ],
    details: [
      { flag: "Pod", text: "Smallest deployable unit: one or more containers." },
      { flag: "Deployment", text: "Declares desired replica count and rolling updates." },
      { flag: "Service", text: "Stable virtual IP + DNS for a set of pods." },
      { flag: "Ingress", text: "HTTP(S) routing to services from outside." },
      { flag: "HPA", text: "Horizontal Pod Autoscaler scales replicas by metrics." },
      { flag: "ConfigMap / Secret", text: "Inject config and credentials without rebuilding images." }
    ]
  }
];