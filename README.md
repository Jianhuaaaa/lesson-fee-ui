# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


这是系统的基本框架。主要功能包括：
### 教师管理：
- 添加/编辑教师信息
- 查看教师列表
- 管理教师状态
### 课时类型管理：
- 设置不同类型的课时及其费率
- 管理课时类型
### 课时记录管理：
- 记录每节课的信息
- 按月份和教师筛选
- 自动计算课时费
### 统计功能：
- 计算每月总课时
- 计算每月应付课时费
- 生成统计报表

要完成整个系统，还需要：
添加路由配置
实现所有服务类
添加表单组件用于数据录入
添加详细页面组件
实现数据持久化
添加权限控制
添加数据验证
你想先了解哪部分的详细实现？或者需要我继续完善某个特定功能？

#### 创建了一个完整的、文件分离的教师管理模块。每个组件的代码都被分成了独立的 .ts、.html 和 .scss 文件，使得代码更容易维护和管理。
#### 好的，我来帮您修改教师列表组件，将编辑功能改为行内编辑模式。

如果您需要启动热部署，可以在angular.json "serve"部分更改：
```bash
"hmr": true,
"liveReload": true,
```
