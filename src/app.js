const STORAGE_KEY = "onion-order-system-v3";
const BRAND_LOGO = "assets/onion-vision-logo.png";

const labels = {
  admin: "管理员",
  employee: "员工",
  lead: "线索",
  quoted: "已报价",
  active: "执行中",
  delivered: "已交付",
  closed: "已完结",
  pending: "待审核",
  approved: "已通过",
  rejected: "已驳回",
  draft: "草稿",
  confirmed: "已确认"
};

const money = (value) => Number(value || 0).toLocaleString("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0
});

const today = new Date().toISOString().slice(0, 10);
const uid = (prefix) => `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;

const seed = {
  sessionUserId: "u_admin",
  activeView: "dashboard",
  expandedProjectId: "p_1",
  showProjectForm: false,
  attachmentPreview: null,
  serviceTypes: [
    { id: "film", name: "影视拍摄" },
    { id: "live", name: "直播转播" },
    { id: "operations", name: "运营服务" }
  ],
  customerSources: ["老客户转介绍", "商务拜访", "朋友介绍", "线上咨询", "招投标"],
  users: [
    { id: "u_admin", name: "孙亚军", email: "admin@onion.local", password: "admin123", role: "admin", department: "管理" },
    { id: "u_zhang", name: "张楠", email: "zhang@onion.local", password: "123456", role: "employee", department: "拍摄组" },
    { id: "u_wu", name: "乌恩奇", email: "wu@onion.local", password: "123456", role: "employee", department: "直播组" },
    { id: "u_liu", name: "刘依灵", email: "liu@onion.local", password: "123456", role: "employee", department: "运营组" }
  ],
  customers: [
    { id: "c_1", name: "呼和浩特城市品牌中心", source: "老客户转介绍", level: "A", ownerId: "u_admin", phone: "0471-000000", address: "呼和浩特市赛罕区", notes: "年度宣传片和直播活动客户" },
    { id: "c_2", name: "北疆文旅集团", source: "商务拜访", level: "B", ownerId: "u_zhang", phone: "0471-118899", address: "新城区", notes: "重点跟进文旅短视频运营" }
  ],
  contacts: [
    { id: "ct_1", customerId: "c_1", name: "王主任", phone: "13800000001", title: "品牌负责人", primary: true },
    { id: "ct_2", customerId: "c_2", name: "李经理", phone: "13800000002", title: "市场部", primary: true }
  ],
  projects: [
    { id: "p_1", code: "XM-2026-001", customerId: "c_1", name: "城市形象宣传片拍摄", serviceType: "film", ownerId: "u_zhang", status: "active", startDate: "2026-05-28", endDate: "2026-06-10", location: "呼和浩特", serviceScope: "脚本策划、三天拍摄、后期剪辑、成片交付", contractAmount: 168000, budgetCost: 72000, delivery: "3分钟主片、30秒短版、花絮素材", notes: "需要提前确认航拍报备" },
    { id: "p_2", code: "XM-2026-002", customerId: "c_2", name: "景区开园直播转播", serviceType: "live", ownerId: "u_wu", status: "quoted", startDate: "2026-06-02", endDate: "2026-06-02", location: "乌兰察布", serviceScope: "四机位导播、推流、现场大屏、录像备份", contractAmount: 86000, budgetCost: 41000, delivery: "直播链接、全程录像、精彩切条", notes: "异地执行，需安排住宿交通" },
    { id: "p_3", code: "XM-2026-003", customerId: "c_2", name: "文旅账号月度运营", serviceType: "operations", ownerId: "u_liu", status: "active", startDate: "2026-05-01", endDate: "2026-05-31", location: "线上", serviceScope: "选题、拍摄协调、剪辑发布、数据复盘", contractAmount: 36000, budgetCost: 12000, delivery: "12条短视频、月报一份", notes: "每周一提交选题表" }
  ],
  subprojects: [
    { id: "sp_1", projectId: "p_1", name: "前期策划", serviceType: "film", shootingEmployeeIds: ["u_zhang"], productionEmployeeIds: ["u_liu"], quantity: 1, unitPrice: 38000, totalAmount: 38000, amount: 38000, costBudget: 8000, commissionRate: 6, status: "active", delivery: "脚本、分镜、拍摄计划" },
    { id: "sp_2", projectId: "p_1", name: "现场拍摄", serviceType: "film", shootingEmployeeIds: ["u_zhang"], productionEmployeeIds: [], quantity: 3, unitPrice: 26000, totalAmount: 78000, amount: 78000, costBudget: 34000, commissionRate: 4, status: "active", delivery: "三天素材" },
    { id: "sp_3", projectId: "p_2", name: "直播技术执行", serviceType: "live", shootingEmployeeIds: ["u_wu"], productionEmployeeIds: ["u_zhang"], quantity: 1, unitPrice: 62000, totalAmount: 62000, amount: 62000, costBudget: 26000, commissionRate: 5, status: "quoted", delivery: "导播推流与录像" },
    { id: "sp_4", projectId: "p_3", name: "账号月度运营", serviceType: "operations", shootingEmployeeIds: [], productionEmployeeIds: ["u_liu"], quantity: 12, unitPrice: 3000, totalAmount: 36000, amount: 36000, costBudget: 12000, commissionRate: 8, status: "active", delivery: "12条短视频与月报" }
  ],
  tasks: [
    { id: "t_1", projectId: "p_1", subprojectId: "sp_1", assigneeId: "u_zhang", title: "脚本终稿确认", taskType: "前期", taskDate: "2026-05-27", location: "公司", status: "active", notes: "客户下午确认" },
    { id: "t_2", projectId: "p_2", subprojectId: "sp_3", assigneeId: "u_wu", title: "直播设备清单", taskType: "技术", taskDate: "2026-05-29", location: "库房", status: "lead", notes: "检查图传和备份网卡" },
    { id: "t_3", projectId: "p_3", subprojectId: "sp_4", assigneeId: "u_liu", title: "月度数据复盘", taskType: "运营", taskDate: today, location: "线上", status: "active", notes: "输出下月内容方向" }
  ],
  costs: [
    { id: "co_1", projectId: "p_1", subprojectId: "sp_2", category: "外协摄影", vendor: "自由摄影师", amount: 18000, occurredOn: "2026-05-28", notes: "两天拍摄" },
    { id: "co_2", projectId: "p_2", subprojectId: "sp_3", category: "差旅住宿", vendor: "现场团队", amount: 9500, occurredOn: "2026-06-02", notes: "预估" }
  ],
  payments: [
    { id: "pay_1", projectId: "p_1", amount: 50000, paidOn: "2026-05-20", account: "对公账户", method: "预付款", invoiceStatus: "未开票", notes: "首款" },
    { id: "pay_2", projectId: "p_3", amount: 36000, paidOn: "2026-05-08", account: "对公账户", method: "月结", invoiceStatus: "已开票", notes: "5月服务费" }
  ],
  reimbursements: [
    { id: "r_1", employeeId: "u_wu", projectId: "p_2", category: "交通报销", amount: 680, occurredOn: "2026-05-25", status: "pending", reason: "直播项目现场勘景往返油费", approvedBy: "", approvedAt: "" },
    { id: "r_2", employeeId: "u_zhang", projectId: "p_1", category: "餐补报销", amount: 320, occurredOn: "2026-05-24", status: "approved", reason: "客户会议及拍摄筹备", approvedBy: "u_admin", approvedAt: "2026-05-25" }
  ],
  attachments: [],
  salaries: [
    { id: "s_1", employeeId: "u_zhang", month: "2026-05", baseAmount: 8000, bonusAmount: 2600, reimbursementAmount: 320, commissionAmount: 6080, deductionAmount: 0, status: "confirmed", notes: "拍摄项目绩效" },
    { id: "s_2", employeeId: "u_wu", month: "2026-05", baseAmount: 7800, bonusAmount: 1800, reimbursementAmount: 0, commissionAmount: 3100, deductionAmount: 0, status: "draft", notes: "待直播项目结算" },
    { id: "s_3", employeeId: "u_liu", month: "2026-05", baseAmount: 7600, bonusAmount: 1200, reimbursementAmount: 0, commissionAmount: 2880, deductionAmount: 0, status: "confirmed", notes: "运营月服务" }
  ],
  commissionRules: [
    { id: "cr_1", employeeId: "u_zhang", serviceType: "film", rate: 5 },
    { id: "cr_2", employeeId: "u_wu", serviceType: "live", rate: 5 },
    { id: "cr_3", employeeId: "u_liu", serviceType: "operations", rate: 8 }
  ],
  targets: [
    { id: "g_1", employeeId: "u_zhang", year: 2026, serviceType: "film", annualAmount: 1200000, q1Amount: 200000, q2Amount: 300000, q3Amount: 350000, q4Amount: 350000 },
    { id: "g_2", employeeId: "u_wu", year: 2026, serviceType: "live", annualAmount: 900000, q1Amount: 150000, q2Amount: 250000, q3Amount: 250000, q4Amount: 250000 },
    { id: "g_3", employeeId: "u_liu", year: 2026, serviceType: "operations", annualAmount: 600000, q1Amount: 120000, q2Amount: 160000, q3Amount: 160000, q4Amount: 160000 }
  ],
  auditLogs: []
};

let state = loadState();

function migrate(data) {
  const next = { ...structuredClone(seed), ...data };
  next.serviceTypes ||= structuredClone(seed.serviceTypes);
  next.customerSources ||= structuredClone(seed.customerSources);
  next.subprojects ||= structuredClone(seed.subprojects);
  next.commissionRules ||= structuredClone(seed.commissionRules);
  next.attachments ||= [];
  next.users = next.users.map((user) => ({ password: user.role === "admin" ? "admin123" : "123456", ...user }));
  next.salaries = next.salaries.map((item) => ({ commissionAmount: 0, ...item }));
  next.subprojects = next.subprojects.map((item) => {
    const totalAmount = Number(item.totalAmount ?? item.amount ?? 0);
    return {
      quantity: Number(item.quantity || 1),
      unitPrice: Number(item.unitPrice || totalAmount),
      totalAmount,
      amount: totalAmount,
      shootingEmployeeIds: item.shootingEmployeeIds || (item.employeeId ? [item.employeeId] : []),
      productionEmployeeIds: item.productionEmployeeIds || [],
      ...item
    };
  });
  next.costs = next.costs.map((item) => ({ subprojectId: "", ...item }));
  next.tasks = next.tasks.map((item) => ({ subprojectId: "", ...item }));
  return next;
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return structuredClone(seed);
  try {
    return migrate(JSON.parse(raw));
  } catch {
    return structuredClone(seed);
  }
}

function saveState(action = "") {
  if (action && currentUser()) {
    state.auditLogs.unshift({
      id: uid("log"),
      actorId: currentUser().id,
      action,
      createdAt: new Date().toLocaleString("zh-CN")
    });
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function currentUser() {
  return state.users.find((user) => user.id === state.sessionUserId) || null;
}

function isAdmin() {
  return currentUser()?.role === "admin";
}

function serviceName(id) {
  return state.serviceTypes.find((item) => item.id === id)?.name || id || "-";
}

function userName(id) {
  return state.users.find((user) => user.id === id)?.name || "未分配";
}

function namesFor(ids = []) {
  const list = Array.isArray(ids) ? ids : [ids].filter(Boolean);
  return list.map(userName).join("、") || "-";
}

function customerName(id) {
  return state.customers.find((customer) => customer.id === id)?.name || "未知客户";
}

function projectName(id) {
  return state.projects.find((project) => project.id === id)?.name || "未关联项目";
}

function subprojectName(id) {
  return state.subprojects.find((item) => item.id === id)?.name || "-";
}

function visibleProjects() {
  if (isAdmin()) return state.projects;
  const userId = currentUser()?.id;
  const subProjectIds = state.subprojects
    .filter((item) => lineEmployeeIds(item).includes(userId))
    .map((item) => item.projectId);
  const taskProjectIds = state.tasks.filter((task) => task.assigneeId === userId).map((task) => task.projectId);
  return state.projects.filter((project) => project.ownerId === userId || subProjectIds.includes(project.id) || taskProjectIds.includes(project.id));
}

function visibleSubprojects() {
  if (isAdmin()) return state.subprojects;
  const userId = currentUser()?.id;
  return state.subprojects.filter((item) => lineEmployeeIds(item).includes(userId) || visibleProjects().some((project) => project.id === item.projectId));
}

function visibleTasks() {
  if (isAdmin()) return state.tasks;
  return state.tasks.filter((task) => task.assigneeId === currentUser()?.id || visibleProjects().some((project) => project.id === task.projectId));
}

function visibleReimbursements() {
  return isAdmin() ? state.reimbursements : state.reimbursements.filter((item) => item.employeeId === currentUser()?.id);
}

function attachmentsFor(entityType, entityId) {
  return state.attachments.filter((item) => item.entityType === entityType && item.entityId === entityId);
}

function canDeleteAttachment(item) {
  return isAdmin() || item.uploadedBy === currentUser()?.id;
}

function visibleSalaries() {
  return isAdmin() ? state.salaries : state.salaries.filter((item) => item.employeeId === currentUser()?.id);
}

function visibleTargets() {
  return isAdmin() ? state.targets : state.targets.filter((item) => item.employeeId === currentUser()?.id);
}

function sum(list, field) {
  return list.reduce((total, item) => total + Number(item[field] || 0), 0);
}

function lineAmount(item) {
  return Number(item.totalAmount ?? item.amount ?? 0);
}

function projectLines(projectId) {
  return state.subprojects.filter((item) => item.projectId === projectId);
}

function projectLineTotal(projectId) {
  return projectLines(projectId).reduce((total, item) => total + lineAmount(item), 0);
}

function projectContract(project) {
  const lineTotal = projectLineTotal(project.id);
  return Number(project.contractAmount || 0) || lineTotal;
}

function lineEmployeeIds(item) {
  return [...new Set([...(item.shootingEmployeeIds || []), ...(item.productionEmployeeIds || []), item.employeeId].filter(Boolean))];
}

function defaultCommissionRate(employeeId, serviceType) {
  return Number(state.commissionRules.find((rule) => rule.employeeId === employeeId && rule.serviceType === serviceType)?.rate || 0);
}

function lineCommissionRows(item) {
  const rows = [];
  [
    ["拍摄", item.shootingEmployeeIds || []],
    ["制作", item.productionEmployeeIds || []]
  ].forEach(([role, employeeIds]) => {
    employeeIds.forEach((employeeId) => {
      const rate = Number(item.commissionRate || 0) || defaultCommissionRate(employeeId, item.serviceType);
      rows.push({
        projectId: item.projectId,
        lineName: item.name,
        serviceType: item.serviceType,
        employeeId,
        role,
        baseAmount: lineAmount(item),
        rate,
        commission: lineAmount(item) * rate / 100
      });
    });
  });
  return rows;
}

function projectPaid(projectId) {
  return sum(state.payments.filter((payment) => payment.projectId === projectId), "amount");
}

function projectActualCost(projectId) {
  return sum(state.costs.filter((cost) => cost.projectId === projectId), "amount");
}

function projectBudgetCost(projectId) {
  const project = state.projects.find((item) => item.id === projectId);
  const subBudget = sum(state.subprojects.filter((item) => item.projectId === projectId), "costBudget");
  return projectActualCost(projectId) || subBudget || Number(project?.budgetCost || 0);
}

function projectCommission(projectId) {
  return projectLines(projectId).flatMap(lineCommissionRows).reduce((total, item) => total + item.commission, 0);
}

function completionForTarget(target) {
  return state.subprojects
    .filter((item) => lineEmployeeIds(item).includes(target.employeeId) && item.serviceType === target.serviceType)
    .reduce((total, item) => total + lineAmount(item), 0);
}

function navItems() {
  const base = [
    ["dashboard", "工作台", "grid"],
    ["customers", "客户", "users"],
    ["projects", "项目订单", "briefcase"],
    ["schedule", "执行排期", "calendar"],
    ["finance", "财务", "wallet"],
    ["salary", "工资报销", "receipt"],
    ["targets", "年度目标", "target"],
    ["reports", "统计", "chart"]
  ];
  if (isAdmin()) base.push(["people", "人事配置", "settings"]);
  return base;
}

function icon(name) {
  const paths = {
    grid: "M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z",
    users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
    briefcase: "M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1M3 7h18v13H3zM3 12h18",
    calendar: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z",
    wallet: "M20 7H5a2 2 0 0 1 0-4h14v4M3 7h18v14H3zM16 14h2",
    receipt: "M4 2v20l3-2 3 2 3-2 3 2 3-2V2zM8 7h8M8 11h8M8 15h5",
    target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4",
    chart: "M3 3v18h18M7 16v-5M12 16V7M17 16v-8",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 2 2 0 1 1-4 0 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 2 2 0 1 1 0-4 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-.6 2 2 0 1 1 4 0 1.65 1.65 0 0 0 1 .6 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9c.22.36.36.74.6 1a2 2 0 1 1 0 4 1.65 1.65 0 0 0-.6 1z"
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name]}" /></svg>`;
}

function render() {
  const user = currentUser();
  if (!user) {
    document.querySelector("#app").innerHTML = loginView();
    bindLogin();
    return;
  }

  document.querySelector("#app").innerHTML = `
    <aside class="sidebar">
      <div class="brand">
        <img class="brand-mark" src="${BRAND_LOGO}" alt="洋葱视觉 logo">
        <div><strong>洋葱视觉</strong><span>业务订单系统</span></div>
      </div>
      <nav>${navItems().map(([id, label, iconName]) => `
        <button class="nav-item ${state.activeView === id ? "active" : ""}" data-view="${id}">
          ${icon(iconName)}<span>${label}</span>
        </button>`).join("")}</nav>
      <div class="sidebar-foot">
        <label>当前账号</label>
        <div class="account-box"><strong>${user.name}</strong><span>${labels[user.role]} · ${user.department || "-"}</span></div>
        <button class="ghost" data-action="logout">退出登录</button>
      </div>
    </aside>
    <main class="main">
      <header class="topbar">
        <div><h1>${navItems().find(([id]) => id === state.activeView)?.[1] || "工作台"}</h1><p>${user.name} · ${labels[user.role]} · ${new Date().toLocaleDateString("zh-CN")}</p></div>
        <div class="top-actions"><button class="ghost" data-action="reset">重置演示数据</button><button class="primary" data-action="new-project">新建项目单</button></div>
      </header>
      <section class="content">${view()}</section>
    </main>
    ${attachmentModal()}`;
  bindEvents();
}

function loginView(error = "") {
  return `
    <main class="login-screen">
      <section class="login-card">
        <div class="brand login-brand"><img class="brand-mark" src="${BRAND_LOGO}" alt="洋葱视觉 logo"><div><strong>洋葱视觉</strong><span>业务订单系统</span></div></div>
        <form data-form="login">
          <label><span>账号邮箱</span><input name="email" type="email" value="admin@onion.local" required></label>
          <label><span>密码</span><input name="password" type="password" value="admin123" required></label>
          ${error ? `<p class="form-error">${error}</p>` : ""}
          <button class="primary full">登录</button>
        </form>
        <p class="login-hint">演示账号：admin@onion.local / admin123；员工账号密码默认为 123456。</p>
      </section>
    </main>`;
}

function bindLogin() {
  document.querySelector("form[data-form='login']").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = formData(event.currentTarget);
    const user = state.users.find((item) => item.email === data.email && item.password === data.password);
    if (!user) {
      document.querySelector("#app").innerHTML = loginView("账号或密码不正确");
      bindLogin();
      return;
    }
    state.sessionUserId = user.id;
    state.activeView = "dashboard";
    saveState(`登录系统：${user.name}`);
  });
}

function view() {
  return ({ dashboard, customers, projects, schedule, finance, salary, targets, reports, people }[state.activeView] || dashboard)();
}

function dashboard() {
  const projects = visibleProjects();
  const contract = projects.reduce((total, project) => total + projectContract(project), 0);
  const paid = projects.reduce((total, project) => total + projectPaid(project.id), 0);
  const cost = projects.reduce((total, project) => total + projectBudgetCost(project.id), 0);
  const pending = visibleReimbursements().filter((item) => item.status === "pending").length;
  return `
    <div class="metrics">
      ${metric("项目合同额", money(contract), "主项目合同金额")}
      ${metric("已回款", money(paid), `回款率 ${contract ? Math.round((paid / contract) * 100) : 0}%`)}
      ${metric("预计毛利", money(contract - cost), "合同额减成本")}
      ${metric("待审报销", `${pending} 条`, "员工提交后由管理员审批")}
    </div>
    <div class="split">
      <section class="panel"><div class="panel-head"><h2>近期执行</h2><button class="ghost" data-view="schedule">查看排期</button></div>${taskList(visibleTasks().slice(0, 5))}</section>
      <section class="panel"><div class="panel-head"><h2>业务线完成</h2><button class="ghost" data-view="targets">年度目标</button></div>${targetPie()}${targetProgress()}</section>
    </div>
    <section class="panel"><div class="panel-head"><h2>项目订单概览</h2><button class="primary" data-view="projects">进入项目订单</button></div>${projectTable(projects.slice(0, 6))}</section>`;
}

function metric(title, value, hint) {
  return `<div class="metric"><span>${title}</span><strong>${value}</strong><small>${hint}</small></div>`;
}

function customers() {
  return `
    <div class="split wide">
      <section class="panel">
        <div class="panel-head"><h2>客户管理</h2><span>${state.customers.length} 个客户</span></div>
        ${simpleTable(["客户", "联系人", "来源", "级别", "负责人", "备注"], state.customers.map((customer) => {
          const contact = state.contacts.find((item) => item.customerId === customer.id);
          return [customer.name, `${contact?.name || "-"} ${contact?.phone || ""}`, customer.source, customer.level, userName(customer.ownerId), customer.notes];
        }))}
      </section>
      <section class="panel form-panel"><div class="panel-head"><h2>新增客户</h2></div>
        <form data-form="customer">
          ${input("name", "客户名称", "text", true)}${input("contact", "联系人", "text")}${input("phone", "联系电话", "tel")}
          ${select("source", "客户来源", [...state.customerSources, ["__custom", "新增来源"]])}${input("customSource", "来源名称", "text")}
          ${select("level", "客户级别", ["A", "B", "C"])}${selectUsers("ownerId", "负责人")}${input("address", "地址", "text")}${textarea("notes", "备注")}
          <button class="primary full">保存客户</button>
        </form>
      </section>
    </div>`;
}

function projects() {
  const rows = visibleProjects();
  return `
    <section class="panel"><div class="panel-head"><h2>项目订单</h2><span>项目金额由业务明细汇总，合同金额可手动调整</span></div>${projectTable(rows)}</section>
    ${state.showProjectForm && isAdmin() ? projectFormModal() : ""}`;
}

function projectFormModal() {
  return `<div class="modal-backdrop" data-action="close-project-form">
    <section class="modal-panel" role="dialog" aria-modal="true" aria-label="新建项目单">
      <div class="panel-head"><h2>新建项目单</h2><button type="button" class="ghost" data-action="close-project-form">关闭</button></div>
      <form class="project-form" data-form="project">
        ${input("name", "项目名称", "text", true)}${selectWithAdd("customerId", "客户名称", state.customers.map((item) => [item.id, item.name]), "customer")}
        ${selectWithAdd("serviceType", "项目主业务类型", state.serviceTypes.map((item) => [item.id, item.name]), "service")}
        ${selectUsers("ownerId", "负责人")}${select("status", "项目状态", [["lead", "线索"], ["quoted", "已报价"], ["active", "执行中"], ["delivered", "已交付"], ["closed", "已完结"]])}
        ${input("startDate", "开始日期", "date")}${input("endDate", "结束日期", "date")}${input("location", "执行地点", "text")}${input("contractAmount", "合同金额调整", "number")}
        ${input("budgetCost", "总预算成本", "number")}${textarea("serviceScope", "服务内容")}${textarea("delivery", "交付物")}${textarea("notes", "备注")}
        <div class="span-2 detail-editor">
          <div class="panel-head compact"><h2>业务明细行</h2><span>数量 × 单价自动计算总价；拍摄/制作人员支持多选</span></div>
          ${businessLineEditor()}
          <div class="detail-total">明细合计：<strong data-detail-total>¥0</strong></div>
        </div>
        <button class="primary full">保存项目单</button>
      </form>
    </section>
  </div>`;
}

function projectTable(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>项目</th><th>客户</th><th>类型</th><th>负责人</th><th>明细</th><th>明细合计</th><th>合同金额</th><th>回款</th><th>成本</th><th>毛利</th><th>提成</th><th>状态</th></tr></thead><tbody>${rows.map((project) => {
    const paid = projectPaid(project.id);
    const cost = projectBudgetCost(project.id);
    const lineTotal = projectLineTotal(project.id);
    const contract = projectContract(project);
    const profit = contract - cost;
    const subs = projectLines(project.id);
    const expanded = state.expandedProjectId === project.id;
    return `<tr class="project-row ${expanded ? "expanded" : ""}" data-toggle-project="${project.id}"><td><strong>${project.code}</strong><br>${project.name}</td><td>${customerName(project.customerId)}</td><td><span class="tag">${serviceName(project.serviceType)}</span></td><td>${userName(project.ownerId)}</td><td>${subs.length} 行</td><td>${money(lineTotal)}</td><td>${money(contract)}</td><td>${money(paid)}</td><td>${money(cost)}</td><td>${money(profit)}</td><td>${money(projectCommission(project.id))}</td><td><span class="status">${labels[project.status] || project.status}</span></td></tr>${expanded ? `<tr class="detail-row"><td colspan="12"><div class="inline-detail"><div class="panel-head compact"><h2>业务明细</h2><span>点击其他项目可切换查看</span></div>${businessLineTable(subs)}</div></td></tr>` : ""}`;
  }).join("")}</tbody></table></div>`;
}

function businessLineTable(rows) {
  return simpleTable(["主项目", "业务内容", "业务类型", "拍摄人员", "制作人员", "数量", "单价", "总价", "成本预算", "提成比例", "状态"], rows.map((item) => [projectName(item.projectId), item.name, serviceName(item.serviceType), namesFor(item.shootingEmployeeIds), namesFor(item.productionEmployeeIds), item.quantity || 1, money(item.unitPrice), money(lineAmount(item)), money(item.costBudget), item.commissionRate ? `${item.commissionRate}%` : "默认比例", labels[item.status] || item.status]));
}

function schedule() {
  const projects = visibleProjects();
  return `<div class="split wide"><section class="panel"><div class="panel-head"><h2>执行排期</h2><span>${visibleTasks().length} 条任务</span></div>${taskList(visibleTasks(), true)}</section>${isAdmin() ? `<section class="panel form-panel"><div class="panel-head"><h2>添加任务</h2></div><form data-form="task">${select("projectId", "关联项目", projects.map((item) => [item.id, item.name]))}${select("subprojectId", "关联业务明细", state.subprojects.map((item) => [item.id, `${projectName(item.projectId)} / ${item.name}`]))}${input("title", "任务名称", "text", true)}${input("taskType", "任务类型", "text")}${selectUsers("assigneeId", "执行人")}${input("taskDate", "执行日期", "date")}${input("location", "地点", "text")}${select("status", "状态", [["lead", "待处理"], ["active", "执行中"], ["delivered", "已完成"]])}${textarea("notes", "任务备注")}<button class="primary full">保存任务</button></form></section>` : ""}</div>`;
}

function taskList(tasks, detailed = false) {
  if (!tasks.length) return `<div class="empty">暂无任务</div>`;
  return `<div class="task-list">${tasks.map((task) => `<article class="task"><div><strong>${task.title}</strong><span>${projectName(task.projectId)} / ${subprojectName(task.subprojectId)} · ${task.taskType || "执行"}</span></div><div><b>${task.taskDate || "-"}</b><span>${task.location || "-"} · ${userName(task.assigneeId)}</span></div>${detailed ? `<p>${task.notes || ""}</p>` : ""}</article>`).join("")}</div>`;
}

function finance() {
  const projects = visibleProjects();
  const visibleProjectIds = projects.map((project) => project.id);
  const costs = state.costs.filter((item) => visibleProjectIds.includes(item.projectId));
  const approvedReimbursements = visibleReimbursements().filter((item) => item.status === "approved");
  const contractTotal = projects.reduce((total, project) => total + projectContract(project), 0);
  return `
    <div class="metrics">${metric("合同总额", money(contractTotal), "当前权限可见项目")}${metric("订单成本", money(sum(costs, "amount")), "必须关联订单/业务明细")}${metric("报销支出", money(sum(approvedReimbursements, "amount")), "员工报销审批通过后计入")}${metric("项目利润", money(contractTotal - sum(costs, "amount") - sum(approvedReimbursements, "amount")), "合同额减订单成本和报销")}</div>
    <section class="panel"><div class="panel-head"><h2>项目利润列表</h2><span>报销在上方财务总览和报销支出中体现</span></div>${simpleTable(["项目", "合同额", "回款", "订单成本", "利润"], projects.map((project) => {
      const projectCosts = costs.filter((item) => item.projectId === project.id);
      const costAmount = sum(projectCosts, "amount");
      return [project.name, money(projectContract(project)), money(projectPaid(project.id)), money(costAmount), money(projectContract(project) - costAmount)];
    }))}</section>
    <div class="split"><section class="panel"><div class="panel-head"><h2>订单成本</h2><span>非报销，关联到项目成本</span></div>${simpleTable(["项目", "业务明细", "类别", "供应商/外协", "金额", "日期", "凭证"], costs.map((item) => [projectName(item.projectId), subprojectName(item.subprojectId), item.category, item.vendor, money(item.amount), item.occurredOn, attachmentButton("cost", item.id)]))}</section><section class="panel"><div class="panel-head"><h2>报销支出</h2><span>员工提交，审批后计入</span></div>${simpleTable(["员工", "项目", "类别", "金额", "日期", "状态", "凭证"], visibleReimbursements().map((item) => [userName(item.employeeId), projectName(item.projectId), item.category, money(item.amount), item.occurredOn, labels[item.status], attachmentButton("reimbursement", item.id)]))}</section></div>
    <section class="panel"><div class="panel-head"><h2>收款记录</h2></div>${simpleTable(["项目", "金额", "日期", "账户", "发票"], state.payments.filter((item) => visibleProjectIds.includes(item.projectId)).map((item) => [projectName(item.projectId), money(item.amount), item.paidOn, item.account, item.invoiceStatus]))}</section>
    ${isAdmin() ? `<div class="split"><section class="panel form-panel"><div class="panel-head"><h2>登记收款</h2></div><form data-form="payment">${select("projectId", "项目", projects.map((item) => [item.id, item.name]))}${input("amount", "金额", "number", true)}${input("paidOn", "收款日期", "date")}${input("account", "账户", "text")}${input("method", "方式", "text")}${input("invoiceStatus", "发票状态", "text")}${textarea("notes", "备注")}<button class="primary full">保存收款</button></form></section><section class="panel form-panel"><div class="panel-head"><h2>登记订单成本</h2></div><form data-form="cost">${select("projectId", "项目", projects.map((item) => [item.id, item.name]))}${select("subprojectId", "业务明细", state.subprojects.map((item) => [item.id, `${projectName(item.projectId)} / ${item.name}`]))}${input("category", "成本类别", "text", true)}${input("vendor", "供应商/外协", "text")}${input("amount", "金额", "number", true)}${input("occurredOn", "发生日期", "date")}${imageUpload()}${textarea("notes", "备注")}<button class="primary full">保存成本</button></form></section></div>` : ""}`;
}

function salary() {
  const commissionRows = visibleSubprojects().flatMap(lineCommissionRows).map((item) => [userName(item.employeeId), item.role, projectName(item.projectId), item.lineName, serviceName(item.serviceType), money(item.baseAmount), `${item.rate}%`, money(item.commission)]);
  return `
    <div class="split"><section class="panel"><div class="panel-head"><h2>报销审批</h2><span>${visibleReimbursements().length} 条</span></div><div class="cards">${visibleReimbursements().map((item) => `<article class="mini-card"><div><strong>${userName(item.employeeId)} · ${item.category}</strong><span>${projectName(item.projectId)}</span></div><b>${money(item.amount)}</b><p>${item.reason}</p><div class="attachment-line"><span>图片凭证</span>${attachmentButton("reimbursement", item.id)}</div><footer><span class="status ${item.status}">${labels[item.status]}</span>${isAdmin() && item.status === "pending" ? `<button data-approve="${item.id}">通过</button><button class="danger" data-reject="${item.id}">驳回</button>` : ""}</footer></article>`).join("")}</div></section><section class="panel"><div class="panel-head"><h2>员工提成列表</h2></div>${simpleTable(["员工", "角色", "项目", "业务内容", "业务", "金额基数", "比例", "预计提成"], commissionRows)}</section></div>
    <section class="panel"><div class="panel-head"><h2>工资记录</h2><span>标准工资文件稍后可按这些字段导入</span></div>${simpleTable(["员工", "月份", "基本", "绩效", "提成", "报销", "扣款", "合计", "状态"], visibleSalaries().map((item) => {
      const total = Number(item.baseAmount) + Number(item.bonusAmount) + Number(item.commissionAmount) + Number(item.reimbursementAmount) - Number(item.deductionAmount);
      return [userName(item.employeeId), item.month, money(item.baseAmount), money(item.bonusAmount), money(item.commissionAmount), money(item.reimbursementAmount), money(item.deductionAmount), money(total), labels[item.status] || item.status];
    }))}</section>
    <div class="split"><section class="panel form-panel"><div class="panel-head"><h2>提交报销</h2></div><form data-form="reimbursement">${select("projectId", "项目", visibleProjects().map((item) => [item.id, item.name]))}${input("category", "报销类别", "text", true)}${input("amount", "金额", "number", true)}${input("occurredOn", "发生日期", "date")}${imageUpload()}${textarea("reason", "事由")}<button class="primary full">提交报销</button></form></section>${isAdmin() ? `<section class="panel form-panel"><div class="panel-head"><h2>录入工资</h2></div><form data-form="salary">${selectUsers("employeeId", "员工")}${input("month", "月份", "month", true)}${input("baseAmount", "基本工资", "number")}${input("bonusAmount", "绩效奖金", "number")}${input("commissionAmount", "提成金额", "number")}${input("reimbursementAmount", "报销计入", "number")}${input("deductionAmount", "扣款", "number")}${select("status", "状态", [["draft", "草稿"], ["confirmed", "已确认"]])}${textarea("notes", "备注")}<button class="primary full">保存工资</button></form><div class="import-note">工资标准文件收到后，会按：员工、月份、基本工资、绩效、提成、报销、扣款、备注 这些字段接入导入。</div></section>` : ""}</div>`;
}

function targets() {
  return `<div class="split"><section class="panel"><div class="panel-head"><h2>年度目标分配</h2><span>按员工 + 业务线拆分</span></div>${targetProgress(true)}</section><section class="panel"><div class="panel-head"><h2>目标完成饼图</h2></div>${targetPie()}</section></div>${isAdmin() ? `<section class="panel form-panel narrow"><div class="panel-head"><h2>新增目标</h2></div><form class="target-form" data-form="target">${selectUsers("employeeId", "员工")}${input("year", "年份", "number", true)}${select("serviceType", "业务线", state.serviceTypes.map((item) => [item.id, item.name]))}${input("annualAmount", "年度目标", "number", true)}${input("q1Amount", "一季度", "number")}${input("q2Amount", "二季度", "number")}${input("q3Amount", "三季度", "number")}${input("q4Amount", "四季度", "number")}<button class="primary full">保存目标</button></form></section>` : ""}`;
}

function targetProgress(detailed = false) {
  const rows = visibleTargets();
  if (!rows.length) return `<div class="empty">暂无目标</div>`;
  return `<div class="goal-list">${rows.map((target) => {
    const done = completionForTarget(target);
    const pct = Math.min(100, Math.round((done / Number(target.annualAmount || 1)) * 100));
    return `<article class="goal"><div><strong>${userName(target.employeeId)} · ${serviceName(target.serviceType)}</strong><span>${target.year} 年目标 ${money(target.annualAmount)}</span></div><div class="bar"><i style="width:${pct}%"></i></div><b>${pct}%</b>${detailed ? `<p>已完成 ${money(done)}；Q1 ${money(target.q1Amount)}，Q2 ${money(target.q2Amount)}，Q3 ${money(target.q3Amount)}，Q4 ${money(target.q4Amount)}</p>` : ""}</article>`;
  }).join("")}</div>`;
}

function targetPie() {
  const rows = visibleTargets().map((target) => ({ label: `${userName(target.employeeId)} · ${serviceName(target.serviceType)}`, value: completionForTarget(target), total: Number(target.annualAmount || 0) }));
  const done = rows.reduce((total, item) => total + item.value, 0);
  const total = rows.reduce((acc, item) => acc + item.total, 0);
  return pieChart("目标完成", [{ label: "已完成", value: done, color: "#16796f" }, { label: "未完成", value: Math.max(0, total - done), color: "#d9e1e5" }]);
}

function reports() {
  const projects = visibleProjects();
  const byType = state.serviceTypes.map((type) => {
    const subs = visibleSubprojects().filter((item) => item.serviceType === type.id);
    const total = subs.reduce((sum, item) => sum + lineAmount(item), 0);
    return [type.name, subs.length, money(total), money(sum(subs, "costBudget")), money(total - sum(subs, "costBudget"))];
  });
  const chartSegments = state.serviceTypes.map((type, index) => {
    const colors = ["#16796f", "#326bba", "#bd6b2f", "#6c7780", "#8a6f2a"];
    const value = visibleSubprojects().filter((item) => item.serviceType === type.id).reduce((sum, item) => sum + lineAmount(item), 0);
    return { label: type.name, value, color: colors[index % colors.length] };
  });
  return `<div class="metrics">${metric("项目数", projects.length, "当前权限可见")}${metric("业务明细数", visibleSubprojects().length, "员工和提成按明细行核算")}${metric("报销已审", `${visibleReimbursements().filter((item) => item.status === "approved").length} 条`, "已通过")}${metric("目标条目", `${visibleTargets().length} 条`, "员工 + 业务线")}</div><div class="split"><section class="panel"><div class="panel-head"><h2>业务分类统计</h2></div>${simpleTable(["业务线", "明细行数", "金额", "预算成本", "预计毛利"], byType)}</section><section class="panel"><div class="panel-head"><h2>业务占比饼图</h2></div>${pieChart("业务占比", chartSegments)}</section></div><section class="panel"><div class="panel-head"><h2>操作记录</h2></div>${simpleTable(["时间", "人员", "动作"], state.auditLogs.slice(0, 12).map((item) => [item.createdAt, userName(item.actorId), item.action]))}</section>`;
}

function people() {
  if (!isAdmin()) return `<div class="empty">员工账号只能查看自己的任务、工资、报销和业绩。</div>`;
  return `<div class="split wide"><section class="panel"><div class="panel-head"><h2>员工与权限</h2></div>${simpleTable(["姓名", "邮箱", "角色", "部门"], state.users.map((user) => [user.name, user.email, labels[user.role], user.department]))}</section><section class="panel form-panel"><div class="panel-head"><h2>新增/分配员工账号</h2></div><form data-form="user">${input("name", "姓名", "text", true)}${input("email", "登录邮箱", "email", true)}${input("password", "初始密码", "text", true)}${select("role", "角色权限", [["employee", "员工"], ["admin", "管理员"]])}${input("department", "部门", "text")}<button class="primary full">保存员工</button></form></section></div><div class="split"><section class="panel"><div class="panel-head"><h2>提成比例设置</h2></div>${simpleTable(["员工", "业务类型", "默认比例"], state.commissionRules.map((rule) => [userName(rule.employeeId), serviceName(rule.serviceType), `${rule.rate}%`]))}</section><section class="panel form-panel"><div class="panel-head"><h2>新增提成比例</h2></div><form data-form="commissionRule">${selectUsers("employeeId", "员工")}${select("serviceType", "业务类型", state.serviceTypes.map((item) => [item.id, item.name]))}${input("rate", "提成比例%", "number", true)}<button class="primary full">保存比例</button></form></section></div>`;
}

function pieChart(title, segments) {
  const total = segments.reduce((acc, item) => acc + Number(item.value || 0), 0) || 1;
  let cursor = 0;
  const gradient = segments.map((item) => {
    const start = cursor;
    cursor += (Number(item.value || 0) / total) * 100;
    return `${item.color} ${start}% ${cursor}%`;
  }).join(", ");
  return `<div class="pie-block"><div class="pie" style="background: conic-gradient(${gradient});"><span>${title}</span></div><div class="legend">${segments.map((item) => `<div><i style="background:${item.color}"></i><span>${item.label}</span><b>${Math.round((Number(item.value || 0) / total) * 100)}%</b></div>`).join("")}</div></div>`;
}

function attachmentButton(entityType, entityId) {
  const items = attachmentsFor(entityType, entityId);
  if (!items.length) return `<span class="muted">无</span>`;
  const preview = items.slice(0, 3).map((item) => `<img src="${item.fileData}" alt="${item.fileName}">`).join("");
  return `<button type="button" class="attachment-pill" data-view-attachments="${entityType}:${entityId}"><span>${items.length} 张</span>${preview}</button>`;
}

function attachmentModal() {
  const target = state.attachmentPreview;
  if (!target) return "";
  const items = attachmentsFor(target.entityType, target.entityId);
  return `<div class="modal-backdrop" data-close-attachments>
    <section class="modal-panel attachment-modal">
      <div class="panel-head"><div><h2>图片凭证</h2><span>${items.length} 张图片</span></div><button type="button" class="ghost" data-close-attachments>关闭</button></div>
      ${items.length ? `<div class="attachment-grid">${items.map((item) => `<figure class="attachment-card"><img src="${item.fileData}" alt="${item.fileName}"><figcaption><span>${item.fileName}</span><small>${userName(item.uploadedBy)} · ${item.createdAt}</small>${canDeleteAttachment(item) ? `<button type="button" class="danger" data-delete-attachment="${item.id}">删除</button>` : ""}</figcaption></figure>`).join("")}</div>` : `<div class="empty">暂无图片凭证</div>`}
    </section>
  </div>`;
}

function simpleTable(headers, rows) {
  if (!rows.length) return `<div class="empty">暂无数据</div>`;
  return `<div class="table-wrap"><table><thead><tr>${headers.map((item) => `<th>${item}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell || "-"}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
}

function input(name, label, type = "text", required = false) {
  return `<label><span>${label}</span><input name="${name}" type="${type}" ${required ? "required" : ""}></label>`;
}

function textarea(name, label) {
  return `<label class="span-2"><span>${label}</span><textarea name="${name}" rows="3"></textarea></label>`;
}

function imageUpload(name = "images") {
  return `<label class="span-2"><span>图片凭证</span><input name="${name}" type="file" accept="image/*" multiple><small class="field-hint">可一次选择多张图片，保存后可在列表中预览和删除。</small></label>`;
}

function selectUsers(name, label) {
  return select(name, label, state.users.map((user) => [user.id, `${user.name} · ${user.department}`]));
}

function multiSelectUsers(name, label) {
  return `<label><span>${label}</span><select name="${name}" multiple size="4">${state.users.map((user) => `<option value="${user.id}">${user.name} · ${user.department}</option>`).join("")}</select></label>`;
}

function selectWithAdd(name, label, options, addType) {
  return `<label><span>${label}</span><div class="select-with-add"><select name="${name}">${options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select>${isAdmin() ? `<button type="button" class="ghost mini-add" data-add="${addType}" data-target="${name}">新增</button>` : ""}</div></label>`;
}

function businessLineEditor() {
  return `<div class="detail-table-wrap"><table class="detail-table"><thead><tr><th>业务类型</th><th>业务内容</th><th>拍摄人员</th><th>制作人员</th><th>数量</th><th>单价</th><th>总价</th><th>成本预算</th><th>提成%</th><th>备注</th></tr></thead><tbody>${[0, 1, 2, 3, 4, 5].map((index) => `<tr data-detail-row>
    <td>${bareSelect(`detailServiceType_${index}`, state.serviceTypes.map((item) => [item.id, item.name]))}</td>
    <td><input name="detailName_${index}" placeholder="如：拍摄/剪辑/直播导播"></td>
    <td>${bareUserMulti(`detailShooting_${index}`)}</td>
    <td>${bareUserMulti(`detailProduction_${index}`)}</td>
    <td><input name="detailQuantity_${index}" type="number" min="0" step="0.01" value="${index === 0 ? 1 : ""}" data-line-quantity></td>
    <td><input name="detailUnitPrice_${index}" type="number" min="0" step="0.01" data-line-price></td>
    <td><output data-line-total>¥0</output></td>
    <td><input name="detailCostBudget_${index}" type="number" min="0" step="0.01"></td>
    <td><input name="detailCommissionRate_${index}" type="number" min="0" step="0.01" placeholder="空=默认"></td>
    <td><input name="detailDelivery_${index}" placeholder="备注"></td>
  </tr>`).join("")}</tbody></table></div>`;
}

function bareSelect(name, options) {
  return `<select name="${name}">${options.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select>`;
}

function bareUserMulti(name) {
  return `<select name="${name}" multiple size="3">${state.users.map((user) => `<option value="${user.id}">${user.name}</option>`).join("")}</select>`;
}

function select(name, label, options) {
  const normalized = options.map((item) => Array.isArray(item) ? item : [item, item]);
  return `<label><span>${label}</span><select name="${name}">${normalized.map(([value, text]) => `<option value="${value}">${text}</option>`).join("")}</select></label>`;
}

function formData(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function bindEvents() {
  document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    state.activeView = button.dataset.view;
    saveState();
  }));
  document.querySelector("[data-action='reset']").addEventListener("click", () => {
    state = structuredClone(seed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    render();
  });
  document.querySelector("[data-action='new-project']").addEventListener("click", () => {
    state.activeView = "projects";
    state.showProjectForm = true;
    saveState();
  });
  document.querySelectorAll("[data-action='close-project-form']").forEach((item) => item.addEventListener("click", (event) => {
    if (event.target !== item && item.classList.contains("modal-backdrop")) return;
    state.showProjectForm = false;
    saveState();
  }));
  document.querySelector("[data-action='logout']").addEventListener("click", () => {
    state.sessionUserId = null;
    saveState();
  });
  document.querySelectorAll("[data-toggle-project]").forEach((row) => row.addEventListener("click", () => {
    state.expandedProjectId = state.expandedProjectId === row.dataset.toggleProject ? "" : row.dataset.toggleProject;
    saveState();
  }));
  document.querySelectorAll("form").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleForm(form.dataset.form, formData(form), form);
  }));
  document.querySelectorAll("[data-add]").forEach((button) => button.addEventListener("click", () => handleQuickAdd(button.dataset.add, button.dataset.target)));
  document.querySelectorAll("[data-detail-row] input").forEach((input) => input.addEventListener("input", updateDetailTotals));
  updateDetailTotals();
  document.querySelectorAll("[data-approve]").forEach((button) => button.addEventListener("click", () => updateReimbursement(button.dataset.approve, "approved")));
  document.querySelectorAll("[data-reject]").forEach((button) => button.addEventListener("click", () => updateReimbursement(button.dataset.reject, "rejected")));
  document.querySelectorAll("[data-view-attachments]").forEach((button) => button.addEventListener("click", () => {
    const [entityType, entityId] = button.dataset.viewAttachments.split(":");
    state.attachmentPreview = { entityType, entityId };
    saveState();
  }));
  document.querySelectorAll("[data-close-attachments]").forEach((item) => item.addEventListener("click", (event) => {
    if (event.target !== item && item.classList.contains("modal-backdrop")) return;
    state.attachmentPreview = null;
    saveState();
  }));
  document.querySelectorAll("[data-delete-attachment]").forEach((button) => button.addEventListener("click", () => deleteAttachment(button.dataset.deleteAttachment)));
}

function normalizeCustomService(data) {
  if (data.serviceType !== "__custom") return data.serviceType;
  const name = data.customServiceType?.trim();
  if (!name) return "film";
  const id = `custom_${name.replace(/\s+/g, "_")}_${state.serviceTypes.length + 1}`;
  state.serviceTypes.push({ id, name });
  return id;
}

function selectedValues(form, name) {
  return [...form.querySelectorAll(`[name="${name}"] option:checked`)].map((option) => option.value);
}

function handleQuickAdd(type, targetName) {
  if (!isAdmin()) return;
  if (type === "service") {
    const name = window.prompt("请输入新的业务类型名称");
    if (!name?.trim()) return;
    const id = `service_${Date.now().toString(36)}`;
    state.serviceTypes.push({ id, name: name.trim() });
    saveState(`新增业务类型：${name.trim()}`);
    const selectEl = document.querySelector(`[name="${targetName}"]`);
    if (selectEl) selectEl.value = id;
    return;
  }
  if (type === "customer") {
    const name = window.prompt("请输入客户名称");
    if (!name?.trim()) return;
    const phone = window.prompt("客户电话（可空）") || "";
    const contact = window.prompt("联系人（可空）") || "";
    const customerId = uid("c");
    state.customers.push({ id: customerId, name: name.trim(), source: "项目单新增", level: "C", ownerId: currentUser().id, phone, address: "", notes: "通过新增按钮创建" });
    if (contact || phone) state.contacts.push({ id: uid("ct"), customerId, name: contact || "联系人", phone, title: "", primary: true });
    saveState(`新增客户：${name.trim()}`);
    const selectEl = document.querySelector(`[name="${targetName}"]`);
    if (selectEl) selectEl.value = customerId;
  }
}

function updateDetailTotals() {
  let total = 0;
  document.querySelectorAll("[data-detail-row]").forEach((row) => {
    const quantity = Number(row.querySelector("[data-line-quantity]")?.value || 0);
    const price = Number(row.querySelector("[data-line-price]")?.value || 0);
    const lineTotal = quantity * price;
    total += lineTotal;
    const output = row.querySelector("[data-line-total]");
    if (output) output.textContent = money(lineTotal);
  });
  const target = document.querySelector("[data-detail-total]");
  if (target) target.textContent = money(total);
}

function collectDetailLines(form, projectId, status) {
  return [0, 1, 2, 3, 4, 5].map((index) => {
    const name = form.querySelector(`[name="detailName_${index}"]`)?.value?.trim();
    const quantity = Number(form.querySelector(`[name="detailQuantity_${index}"]`)?.value || 0);
    const unitPrice = Number(form.querySelector(`[name="detailUnitPrice_${index}"]`)?.value || 0);
    if (!name || !quantity || !unitPrice) return null;
    const totalAmount = quantity * unitPrice;
    return {
      id: uid("sp"),
      projectId,
      name,
      serviceType: form.querySelector(`[name="detailServiceType_${index}"]`)?.value || state.serviceTypes[0]?.id,
      shootingEmployeeIds: selectedValues(form, `detailShooting_${index}`),
      productionEmployeeIds: selectedValues(form, `detailProduction_${index}`),
      quantity,
      unitPrice,
      totalAmount,
      amount: totalAmount,
      costBudget: Number(form.querySelector(`[name="detailCostBudget_${index}"]`)?.value || 0),
      commissionRate: Number(form.querySelector(`[name="detailCommissionRate_${index}"]`)?.value || 0),
      status,
      delivery: form.querySelector(`[name="detailDelivery_${index}"]`)?.value || ""
    };
  }).filter(Boolean);
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function collectImageAttachments(form, entityType, entityId) {
  const files = [...(form.querySelector(`[name="images"]`)?.files || [])].filter((file) => file.type.startsWith("image/"));
  if (!files.length) return [];
  return Promise.all(files.map(async (file) => ({
    id: uid("att"),
    entityType,
    entityId,
    fileName: file.name,
    fileType: file.type,
    fileData: await fileToDataUrl(file),
    uploadedBy: currentUser().id,
    createdAt: new Date().toLocaleString("zh-CN")
  })));
}

async function addImageAttachments(form, entityType, entityId) {
  const items = await collectImageAttachments(form, entityType, entityId);
  state.attachments.push(...items);
  return items.length;
}

function deleteAttachment(id) {
  const item = state.attachments.find((entry) => entry.id === id);
  if (!item || !canDeleteAttachment(item)) return;
  state.attachments = state.attachments.filter((entry) => entry.id !== id);
  saveState(`删除${item.entityType === "cost" ? "成本" : "报销"}凭证：${item.fileName}`);
}

async function handleForm(type, data, form) {
  const numeric = ["contractAmount", "budgetCost", "amount", "quantity", "unitPrice", "costBudget", "commissionRate", "rate", "baseAmount", "bonusAmount", "commissionAmount", "reimbursementAmount", "deductionAmount", "annualAmount", "q1Amount", "q2Amount", "q3Amount", "q4Amount"];
  numeric.forEach((key) => {
    if (key in data) data[key] = Number(data[key] || 0);
  });
  delete data.images;

  if (type === "customer") {
    const source = data.source === "__custom" && data.customSource?.trim() ? data.customSource.trim() : data.source;
    if (source && !state.customerSources.includes(source)) state.customerSources.push(source);
    const customerId = uid("c");
    state.customers.push({ id: customerId, name: data.name, source, level: data.level, ownerId: data.ownerId, phone: data.phone, address: data.address, notes: data.notes });
    if (data.contact || data.phone) state.contacts.push({ id: uid("ct"), customerId, name: data.contact || "联系人", phone: data.phone, title: "", primary: true });
    return saveState(`新增客户：${data.name}`);
  }

  if (type === "project") {
    const projectId = uid("p");
    const lines = collectDetailLines(form, projectId, data.status);
    const lineTotal = lines.reduce((total, item) => total + lineAmount(item), 0);
    const contractAmount = Number(data.contractAmount || 0) || lineTotal;
    state.projects.push({ id: projectId, code: `XM-${new Date().getFullYear()}-${String(state.projects.length + 1).padStart(3, "0")}`, ...data, contractAmount });
    state.subprojects.push(...lines);
    state.expandedProjectId = projectId;
    state.showProjectForm = false;
    return saveState(`新增项目单：${data.name}`);
  }

  if (type === "subproject") {
    const totalAmount = Number(data.quantity || 0) * Number(data.unitPrice || 0);
    state.subprojects.push({
      id: uid("sp"),
      ...data,
      shootingEmployeeIds: selectedValues(form, "shootingEmployeeIds"),
      productionEmployeeIds: selectedValues(form, "productionEmployeeIds"),
      totalAmount,
      amount: totalAmount
    });
    return saveState(`新增业务明细：${data.name}`);
  }

  if (type === "task") {
    state.tasks.push({ id: uid("t"), ...data });
    return saveState(`新增执行任务：${data.title}`);
  }

  if (type === "payment") {
    state.payments.push({ id: uid("pay"), ...data });
    return saveState(`登记收款：${money(data.amount)}`);
  }

  if (type === "cost") {
    const costId = uid("co");
    state.costs.push({ id: costId, ...data });
    const imageCount = await addImageAttachments(form, "cost", costId);
    return saveState(`登记订单成本：${money(data.amount)}${imageCount ? `，上传${imageCount}张凭证` : ""}`);
  }

  if (type === "reimbursement") {
    const reimbursementId = uid("r");
    state.reimbursements.push({ id: reimbursementId, employeeId: currentUser().id, status: "pending", approvedBy: "", approvedAt: "", ...data });
    const imageCount = await addImageAttachments(form, "reimbursement", reimbursementId);
    return saveState(`提交报销：${money(data.amount)}${imageCount ? `，上传${imageCount}张凭证` : ""}`);
  }

  if (type === "salary") {
    state.salaries.push({ id: uid("s"), ...data });
    return saveState(`录入工资：${userName(data.employeeId)} ${data.month}`);
  }

  if (type === "target") {
    state.targets.push({ id: uid("g"), ...data });
    return saveState(`新增年度目标：${userName(data.employeeId)} ${serviceName(data.serviceType)}`);
  }

  if (type === "user") {
    state.users.push({ id: uid("u"), ...data });
    return saveState(`新增员工账号：${data.name}`);
  }

  if (type === "commissionRule") {
    state.commissionRules.push({ id: uid("cr"), ...data });
    return saveState(`设置提成比例：${userName(data.employeeId)} ${serviceName(data.serviceType)} ${data.rate}%`);
  }
}

function updateReimbursement(id, status) {
  const item = state.reimbursements.find((entry) => entry.id === id);
  if (!item) return;
  item.status = status;
  item.approvedBy = currentUser().id;
  item.approvedAt = new Date().toISOString();
  saveState(`${labels[status]}报销：${userName(item.employeeId)} ${money(item.amount)}`);
}

render();
