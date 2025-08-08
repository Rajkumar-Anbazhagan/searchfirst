<?php
$mysqli = new mysqli('localhost', 'root', 'SearchFirst@2002', 'erp_admin_db', 3306);
if ($mysqli->connect_errno) {
    die('Failed to connect to MySQL: ' . $mysqli->connect_error);
}

// Handle Add
if (isset($_POST['add'])) {
    $regulation = $mysqli->real_escape_string($_POST['regulation']);
    $course_code = $mysqli->real_escape_string($_POST['course_code']);
    $core_branch = $mysqli->real_escape_string($_POST['core_branch']);
    $course_title = $mysqli->real_escape_string($_POST['course_title']);
    $course_mode = $mysqli->real_escape_string($_POST['course_mode']);
    $syllabus_file = '';
    if (isset($_FILES['syllabus_file']) && $_FILES['syllabus_file']['error'] == 0) {
        $target_dir = 'course_file/';
        $syllabus_file = basename($_FILES['syllabus_file']['name']);
        move_uploaded_file($_FILES['syllabus_file']['tmp_name'], $target_dir . $syllabus_file);
    }
    $mysqli->query("INSERT INTO courses (regulation, course_code, core_branch, course_title, syllabus_file, course_mode) VALUES ('$regulation', '$course_code', '$core_branch', '$course_title', '$syllabus_file', '$course_mode')");
    header('Location: courses.php'); exit;
}
// Handle Edit
if (isset($_POST['edit'])) {
    $id = (int)$_POST['id'];
    $regulation = $mysqli->real_escape_string($_POST['regulation']);
    $course_code = $mysqli->real_escape_string($_POST['course_code']);
    $core_branch = $mysqli->real_escape_string($_POST['core_branch']);
    $course_title = $mysqli->real_escape_string($_POST['course_title']);
    $course_mode = $mysqli->real_escape_string($_POST['course_mode']);
    $syllabus_file = '';
    if (isset($_FILES['syllabus_file']) && $_FILES['syllabus_file']['error'] == 0) {
        $target_dir = 'course_file/';
        $syllabus_file = basename($_FILES['syllabus_file']['name']);
        move_uploaded_file($_FILES['syllabus_file']['tmp_name'], $target_dir . $syllabus_file);
        $mysqli->query("UPDATE courses SET regulation='$regulation', course_code='$course_code', core_branch='$core_branch', course_title='$course_title', syllabus_file='$syllabus_file', course_mode='$course_mode' WHERE id=$id");
    } else {
        $mysqli->query("UPDATE courses SET regulation='$regulation', course_code='$course_code', core_branch='$core_branch', course_title='$course_title', course_mode='$course_mode' WHERE id=$id");
    }
    header('Location: courses.php'); exit;
}
// Handle Delete (single or multiple)
if (isset($_POST['delete'])) {
    $ids = $_POST['ids'];
    if (is_array($ids)) {
        $ids = array_map('intval', $ids);
        $ids_str = implode(',', $ids);
        $mysqli->query("DELETE FROM courses WHERE id IN ($ids_str)");
    } elseif (is_numeric($ids)) {
        $id = (int)$ids;
        $mysqli->query("DELETE FROM courses WHERE id=$id");
    }
    header('Location: courses.php'); exit;
}
$courses = $mysqli->query("SELECT * FROM courses ORDER BY id ASC");
$branches = $mysqli->query("SELECT * FROM course_category ORDER BY branch ASC");
$modes = $mysqli->query("SELECT * FROM course_mode ORDER BY mode ASC");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Title -->
    <title> Institution Type Management</title>
    <!-- Favicon -->
    <link rel="shortcut icon" href="assets/images/logo/sf-1.png">
    <!-- Bootstrap -->
    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <!-- file upload -->
    <link rel="stylesheet" href="assets/css/file-upload.css">
    <!-- file upload -->
    <link rel="stylesheet" href="assets/css/plyr.css">
    <!-- DataTables -->
    <link rel="stylesheet" href="https://cdn.datatables.net/2.0.8/css/dataTables.dataTables.min.css">
    <!-- full calendar -->
    <link rel="stylesheet" href="assets/css/full-calendar.css">
    <!-- jquery Ui -->
    <link rel="stylesheet" href="assets/css/jquery-ui.css">
    <!-- editor quill Ui -->
    <link rel="stylesheet" href="assets/css/editor-quill.css">
    <!-- apex charts Css -->
    <link rel="stylesheet" href="assets/css/apexcharts.css">
    <!-- calendar Css -->
    <link rel="stylesheet" href="assets/css/calendar.css">
    <!-- jvector map Css -->
    <link rel="stylesheet" href="assets/css/jquery-jvectormap-2.0.5.css">
    <!-- Main css -->
    <link rel="stylesheet" href="assets/css/main.css">
</head>

<body>

    <!--==================== Preloader Start ====================-->
    <div class="preloader">
        <div class="loader"></div>
    </div>
    <!--==================== Preloader End ====================-->

    <!--==================== Sidebar Overlay End ====================-->
    <div class="side-overlay"></div>
    <!--==================== Sidebar Overlay End ====================-->

    <!-- ============================ Sidebar Start ============================ -->

    <aside class="sidebar">
        <!-- sidebar close btn -->
        <button type="button"
            class="sidebar-close-btn text-gray-500 hover-text-white hover-bg-main-600 text-md w-24 h-24 border border-gray-100 hover-border-main-600 d-xl-none d-flex flex-center rounded-circle position-absolute"><i
                class="ph ph-x"></i></button>
        <!-- sidebar close btn -->

        <a href="index.php"
            class="sidebar__logo text-center p-20 position-sticky inset-block-start-0 bg-white w-100 z-1 pb-10">
            <img src="assets/images/logo/sf-1.png" alt="Logo">
        </a>

        <div class="sidebar-menu-wrapper overflow-y-auto scroll-sm">
            <div class="p-20 pt-10">
                <ul class="sidebar-menu">
                    <li class="sidebar-menu__item">
                        <a href="index.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-house"></i></span>
                            <span class="text">Dashboard</span>
                        </a>
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-circles-four"></i></span>
                            <span class="text">Configuration Settings</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="regulation.php" class="sidebar-submenu__link"> Regulation </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="academic_year.php" class="sidebar-submenu__link"> Academic Year </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="batch.php" class="sidebar-submenu__link"> Batch </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="semester.php" class="sidebar-submenu__link"> Semester </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="subject_type.php" class="sidebar-submenu__link"> Subject Type </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="exam_officers.php" class="sidebar-submenu__link"> Exam Officers </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>
                   <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-building-office"></i></span>
                            <span class="text">Institution</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="institution_type.php" class="sidebar-submenu__link"> Institution Type </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="add_institution.php" class="sidebar-submenu__link"> Add Institution </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>
<li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-book-bookmark"></i></span>
                            <span class="text">Courses</span>
                        </a>
                        <!-- Submenu start -->
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item">
                                <a href="course_category.php" class="sidebar-submenu__link"> Course Category </a>
                            </li>
                            <li class="sidebar-submenu__item">
                                <a href="courses.php" class="sidebar-submenu__link"> Courses </a>
                            </li>
                        </ul>
                        <!-- Submenu End -->
                    </li>
                    <li class="sidebar-menu__item">
                        <a href="courses_assign.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-file-plus"></i></span>
                            <span class="text">Course Assign</span>
                        </a>
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-clipboard-text"></i></span>
                            <span class="text">Subject</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Subject Category</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">List</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Add</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Subjects</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">List</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Add</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-users"></i></span>
                            <span class="text">Faculty</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Faculty Category</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">List</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Add</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Faculties</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">List</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Add</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-users-three"></i></span>
                            <span class="text">Students</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Student Category</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">List</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Add</a>
                                    </li>
                                </ul>
                            </li>
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Students</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">List</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Add</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-menu__item has-dropdown">
                        <a href="javascript:void(0)" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-chats-teardrop"></i></span>
                            <span class="text">Question Bank</span>
                        </a>
                        <ul class="sidebar-submenu">
                            <li class="sidebar-submenu__item has-nested">
                                <a href="javascript:void(0)" class="sidebar-submenu__link toggle-nested">Question</a>
                                <ul class="sidebar-submenu nested-submenu" style="display:none;">
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">One Mark</a>
                                    </li>
                                    <li class="sidebar-submenu__item">
                                        <a href="#" class="sidebar-submenu__link">Two Marks , Three Marks</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-menu__item">
                        <a href="exam_settings.php" class="sidebar-menu__link">
                            <span class="icon"><i class="ph ph-chart-bar"></i></span>
                            <span class="text">Exam Settings</span>
                        </a>
                    </li>

                </ul>
            </div>
        </div>

    </aside>
    <!-- ============================ Sidebar End  ============================ -->

    <div class="dashboard-main-wrapper">
        <div class="top-navbar flex-between gap-16">

            <div class="flex-align gap-16">
                <!-- Toggle Button Start -->
                <button type="button" class="toggle-btn d-xl-none d-flex text-26 text-gray-500"><i
                        class="ph ph-list"></i></button>
                <!-- Toggle Button End -->

                <form action="#" class="w-350 d-sm-block d-none">
                    <div class="position-relative">
                        <button type="submit" class="input-icon text-xl d-flex text-gray-100 pointer-event-none"><i
                                class="ph ph-magnifying-glass"></i></button>
                        <input type="text"
                            class="form-control ps-40 h-40 border-transparent focus-border-main-600 bg-main-50 rounded-pill placeholder-15"
                            placeholder="Search...">
                    </div>
                </form>
            </div>

            <div class="flex-align gap-16">
                <div class="flex-align gap-8">
                    <!-- Notification Start -->
                    <div class="dropdown">
                        <button
                            class="dropdown-btn shaking-animation text-gray-500 w-40 h-40 bg-main-50 hover-bg-main-100 transition-2 rounded-circle text-xl flex-center"
                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="position-relative">
                                <i class="ph ph-bell"></i>
                                <span class="alarm-notify position-absolute end-0"></span>
                            </span>
                        </button>
                        <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                            <div class="card border border-gray-100 rounded-12 box-shadow-custom p-0 overflow-hidden">
                                <div class="card-body p-0">
                                    <div class="py-8 px-24 bg-main-600">
                                        <div class="flex-between">
                                            <h5 class="text-xl fw-semibold text-white mb-0">Notifications</h5>
                                            <div class="flex-align gap-12">
                                                <button type="button"
                                                    class="bg-white rounded-6 text-sm px-8 py-2 hover-text-primary-600">
                                                    New </button>
                                                <button type="button"
                                                    class="close-dropdown hover-scale-1 text-xl text-white"><i
                                                        class="ph ph-x"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="p-24 max-h-270 overflow-y-auto scroll-sm">
                                        <div class="d-flex align-items-start gap-12">
                                            <img src="assets/images/thumbs/notification-img1.png" alt=""
                                                class="w-48 h-48 rounded-circle object-fit-cover">
                                            <div class="border-bottom border-gray-100 mb-24 pb-24">
                                                <div class="flex-align gap-4">
                                                    <a href="#"
                                                        class="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Ashwin
                                                        Bose is requesting access to Design File - Final Project. </a>
                                                    <!-- Three Dot Dropdown Start -->
                                                    <div class="dropdown flex-shrink-0">
                                                        <button class="text-gray-200 rounded-4" type="button"
                                                            data-bs-toggle="dropdown" aria-expanded="false">
                                                            <i class="ph-fill ph-dots-three-outline"></i>
                                                        </button>
                                                        <div
                                                            class="dropdown-menu dropdown-menu--md border-0 bg-transparent p-0">
                                                            <div
                                                                class="card border border-gray-100 rounded-12 box-shadow-custom">
                                                                <div class="card-body p-12">
                                                                    <div
                                                                        class="max-h-200 overflow-y-auto scroll-sm pe-8">
                                                                        <ul>
                                                                            <li class="mb-0">
                                                                                <a href="#"
                                                                                    class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                    <span class="text">Mark as
                                                                                        read</span>
                                                                                </a>
                                                                            </li>
                                                                            <li class="mb-0">
                                                                                <a href="#"
                                                                                    class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                    <span class="text">Delete
                                                                                        Notification</span>
                                                                                </a>
                                                                            </li>
                                                                            <li class="mb-0">
                                                                                <a href="#"
                                                                                    class="py-6 text-15 px-8 hover-bg-gray-50 text-gray-300 rounded-8 fw-normal text-xs d-block">
                                                                                    <span class="text">Report</span>
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <!-- Three Dot Dropdown End -->
                                                </div>
                                                <div class="flex-align gap-6 mt-8">
                                                    <img src="assets/images/icons/google-drive.png" alt="">
                                                    <div class="flex-align gap-4">
                                                        <p class="text-gray-900 text-sm text-line-1">Design brief and
                                                            ideas.txt</p>
                                                        <span class="text-xs text-gray-200 flex-shrink-0">2.2 MB</span>
                                                    </div>
                                                </div>
                                                <div class="mt-16 flex-align gap-8">
                                                    <button type="button"
                                                        class="btn btn-main py-8 text-15 fw-normal px-16">Accept</button>
                                                    <button type="button"
                                                        class="btn btn-outline-gray py-8 text-15 fw-normal px-16">Decline</button>
                                                </div>
                                                <span class="text-gray-200 text-13 mt-8">2 mins ago</span>
                                            </div>
                                        </div>
                                        <div class="d-flex align-items-start gap-12">
                                            <img src="assets/images/thumbs/notification-img2.png" alt=""
                                                class="w-48 h-48 rounded-circle object-fit-cover">
                                            <div class="">
                                                <a href="#"
                                                    class="fw-medium text-15 mb-0 text-gray-300 hover-text-main-600 text-line-2">Patrick
                                                    added a comment on Design Assets - Smart Tags file:</a>
                                                <span class="text-gray-200 text-13">2 mins ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <a href="#"
                                        class="py-13 px-24 fw-bold text-center d-block text-primary-600 border-top border-gray-100 hover-text-decoration-underline">
                                        View All </a>

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Notification Start -->
                </div>


                <!-- User Profile Start -->
                <div class="dropdown">
                    <button
                        class="users arrow-down-icon border border-gray-200 rounded-pill p-4 d-inline-block pe-40 position-relative"
                        type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="position-relative">
                            <img src="assets/images/thumbs/user-img.png" alt="Image" class="h-32 w-32 rounded-circle">
                            <span
                                class="activation-badge w-8 h-8 position-absolute inset-block-end-0 inset-inline-end-0"></span>
                        </span>
                    </button>
                    <div class="dropdown-menu dropdown-menu--lg border-0 bg-transparent p-0">
                        <div class="card border border-gray-100 rounded-12 box-shadow-custom">
                            <div class="card-body">
                                <div class="flex-align gap-8 mb-20 pb-20 border-bottom border-gray-100">
                                    <img src="assets/images/thumbs/user-img.png" alt=""
                                        class="w-54 h-54 rounded-circle">
                                    <div class="">
                                        <h4 class="mb-0">Michel John</h4>
                                        <p class="fw-medium text-13 text-gray-200">examplemail@mail.com</p>
                                    </div>
                                </div>
                                <ul class="max-h-270 overflow-y-auto scroll-sm pe-4">
                                    <li class="mb-4">
                                        <a href="setting.php"
                                            class="py-12 text-15 px-20 hover-bg-gray-50 text-gray-300 rounded-8 flex-align gap-8 fw-medium text-15">
                                            <span class="text-2xl text-primary-600 d-flex"><i
                                                    class="ph ph-sign-out"></i></span>
                                            <span class="text">Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- User Profile Start -->

            </div>
        </div>


        <div class="dashboard-body">
                    <div class="card mt-24">
                        <div class="card-body">
               <h4>Course Management</h4>
    <!-- Add Course Modal Trigger -->
    <button type="button" class="btn btn-success mb-3" data-bs-toggle="modal" data-bs-target="#addModal">Add Course</button>
    <form method="post" id="deleteForm">
        <div class="table-responsive mt-12">
            <table id="courseTable" class="table table-bordered table-striped align-middle text-center mt-12 mb-12" style="font-size:15px;">
                <thead class="table-light">
                    <tr>
                        <th style="text-align: left;"><input type="checkbox" id="selectAll"></th>
                        <th style="text-align: left;">ID</th>
                        <th style="text-align: left;">Regulation</th>
                        <th style="text-align: left;">Course Code</th>
                        <th style="text-align: left;">Branch</th>
                        <th>Title</th>
                        <th>Mode</th>
                        <th>Syllabus File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php while($row = $courses->fetch_assoc()): ?>
                    <tr>
                        <td><input type="checkbox" name="ids[]" value="<?= $row['id'] ?>"></td>
                        <td><?= $row['id'] ?></td>
                        <td><?= htmlspecialchars($row['regulation']) ?></td>
                        <td><?= htmlspecialchars($row['course_code']) ?></td>
                        <td><?= htmlspecialchars($row['core_branch']) ?></td>
                        <td><?= htmlspecialchars($row['course_title']) ?></td>
                        <td><?= htmlspecialchars($row['course_mode']) ?></td>
                        <td style="min-width:120px;max-width:180px;">
                            <?php if($row['syllabus_file']): ?>
                                <a href="course_file/<?= htmlspecialchars($row['syllabus_file']) ?>" target="_blank">View</a><br>
                                <iframe src="course_file/<?= htmlspecialchars($row['syllabus_file']) ?>" style="width:120px;height:120px;border:1px solid #ccc;" frameborder="0"></iframe>
                            <?php endif; ?>
                        </td>
                        <td>
                            <button type="button" class="btn btn-primary btn-sm editBtn" data-id="<?= $row['id'] ?>" data-regulation="<?= htmlspecialchars($row['regulation']) ?>" data-course_code="<?= htmlspecialchars($row['course_code']) ?>" data-core_branch="<?= htmlspecialchars($row['core_branch']) ?>" data-course_title="<?= htmlspecialchars($row['course_title']) ?>" data-course_mode="<?= htmlspecialchars($row['course_mode']) ?>">Edit</button>
                            <button type="submit" name="ids" value="<?= $row['id'] ?>" class="btn btn-danger btn-sm" onclick="return confirm('Delete this course?')">Delete</button>
                        </td>
                    </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
        <button type="submit" name="delete" value="1" class="btn btn-danger mt-2" onclick="return confirm('Delete selected courses?')">Delete Selected</button>
    </form>
        <!-- Add Modal -->
    <div class="modal" tabindex="-1" id="addModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <form method="post" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h5 class="modal-title">Add Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body row g-2">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Regulation</label><br>
                            <?php $regs = $mysqli->query("SELECT * FROM regulation ORDER BY regulation ASC"); $first = true; while($r = $regs->fetch_assoc()): ?>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input editRegulationRadio" type="radio" name="regulation" id="edit_reg_<?= htmlspecialchars($r['regulation']) ?>" value="<?= htmlspecialchars($r['regulation']) ?>">
                                    <label class="form-check-label" for="edit_reg_<?= htmlspecialchars($r['regulation']) ?>"> <?= htmlspecialchars($r['regulation']) ?> </label>
                                </div>
                            <?php $first = false; endwhile; ?>
                        </div>
                        <div class="col-12 mb-2">
                            <label class="form-label fw-bold">Course Code</label><br>
                            <input type="text" name="course_code" class="form-control" placeholder="Course Code" required>
                        </div>
                        <div class="col-12 mb-2">
                            <label class="form-label fw-bold">Core Branch</label><br>
                            <select name="core_branch" class="form-control" required>
                                <option value="">Select Branch</option>
                                <?php $branches2 = $mysqli->query("SELECT * FROM course_category ORDER BY branch ASC"); while($b = $branches2->fetch_assoc()): ?>
                                <option value="<?= htmlspecialchars($b['branch']) ?>"><?= htmlspecialchars($b['branch']) ?></option>
                                <?php endwhile; ?>
                            </select>
                        </div>
                        <div class="col-12 mb-2">
                            <label class="form-label fw-bold">Course Title</label><br>
                            <input type="text" name="course_title" class="form-control" placeholder="Course Title" required>
                        </div>
                        <div class="col-12 mb-2">
                            <label class="form-label fw-bold">Course Mode</label><br>
                            <select name="course_mode" class="form-control" required>
                                <option value="">Select Mode</option>
                                <?php $modes2 = $mysqli->query("SELECT * FROM course_mode ORDER BY mode ASC"); while($m = $modes2->fetch_assoc()): ?>
                                <option value="<?= htmlspecialchars($m['mode']) ?>"><?= htmlspecialchars($m['mode']) ?></option>
                                <?php endwhile; ?>
                            </select>
                        </div>
                        <div class="col-12 mb-2">
                            <label class="form-label fw-bold">Syllabus File</label><br>
                            <input type="file" name="syllabus_file" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" name="add" class="btn btn-success">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

            <!-- Edit Modal -->
    <div class="modal" tabindex="-1" id="editModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <form method="post" enctype="multipart/form-data">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Course</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input type="hidden" name="id" id="editId">
                        <div class="mb-3">
                            <label class="form-label fw-bold">Regulation</label><br>
                            <?php $regs = $mysqli->query("SELECT * FROM regulation ORDER BY regulation ASC"); $first = true; while($r = $regs->fetch_assoc()): ?>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input editRegulationRadio" type="radio" name="regulation" id="edit_reg_<?= htmlspecialchars($r['regulation']) ?>" value="<?= htmlspecialchars($r['regulation']) ?>">
                                    <label class="form-check-label" for="edit_reg_<?= htmlspecialchars($r['regulation']) ?>"> <?= htmlspecialchars($r['regulation']) ?> </label>
                                </div>
                            <?php $first = false; endwhile; ?>
                        </div>
                        <div class="mb-2">
                            <label class="form-label fw-bold">Course Code</label><br>
                            <input type="text" name="course_code" id="editCourseCode" class="form-control" placeholder="Course Code" required></div>
                        <div class="mb-2">
                            <label class="form-label fw-bold">Core Branch</label><br>
                            <select name="core_branch" id="editCoreBranch" class="form-control" required>
                                <option value="">Select Branch</option>
                                <?php $branches3 = $mysqli->query("SELECT * FROM course_category ORDER BY branch ASC"); while($b = $branches3->fetch_assoc()): ?>
                                <option value="<?= htmlspecialchars($b['branch']) ?>"><?= htmlspecialchars($b['branch']) ?></option>
                                <?php endwhile; ?>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-label fw-bold">Course Title</label><br>
                            <input type="text" name="course_title" id="editCourseTitle" class="form-control" placeholder="Course Title" required></div>
                        <div class="mb-2">
                            <label class="form-label fw-bold">Course Mode</label><br>
                            <select name="course_mode" id="editCourseMode" class="form-control" required>
                                <option value="">Select Mode</option>
                                <?php $modes3 = $mysqli->query("SELECT * FROM course_mode ORDER BY mode ASC"); while($m = $modes3->fetch_assoc()): ?>
                                <option value="<?= htmlspecialchars($m['mode']) ?>"><?= htmlspecialchars($m['mode']) ?></option>
                                <?php endwhile; ?>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-label fw-bold">Syllabus File</label><br>
                            <input type="file" name="syllabus_file" class="form-control"></div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" name="edit" class="btn btn-primary">Save changes</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
<script src="assets/js/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://cdn.datatables.net/2.0.8/js/dataTables.min.js"></script>
<script>
$(function(){
    $('#courseTable').DataTable();
    $('#selectAll').on('click', function(){
        $('input[name="ids[]"]').prop('checked', this.checked);
    });
    $(document).on('click', '.editBtn', function(){
        $('#editId').val($(this).data('id'));
        $('#editRegulation').val($(this).data('regulation'));
        $('#editCourseCode').val($(this).data('course_code'));
        $('#editCoreBranch').val($(this).data('core_branch'));
        $('#editCourseTitle').val($(this).data('course_title'));
        $('#editCourseMode').val($(this).data('course_mode'));
        var modal = new bootstrap.Modal(document.getElementById('editModal'));
        modal.show();
    });
});
</script>
    <style>
    #courseTable th, #courseTable td {
        text-align: center;
        vertical-align: middle;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 8px;
        font-size: 15px;
        color: #313335 !important;
    }
    .btn-sm {
        padding: 4px 8px;
        font-size: 12px;
    }
    </style>



            </div>
            </div>
        </div>
        <div class="dashboard-footer">
            <div class="flex-between flex-wrap gap-16">
                <p class="text-gray-300 text-13 fw-normal"> &copy; Copyright SearchFirst 2025, All Right Reserverd</p>
                <div class="flex-align flex-wrap gap-16">
                    <a href="#"
                        class="text-gray-300 text-13 fw-normal hover-text-main-600 
                        hover-text-decoration-none">Made With ❤️ SearchFirst</a>
                    </div>
            </div>
        </div>
    </div>

    <!-- Phosphor Js -->
    <script src="assets/js/phosphor-icon.js"></script>
    <!-- file upload -->
    <script src="assets/js/file-upload.js"></script>
    <!-- file upload -->
    <script src="assets/js/plyr.js"></script>
    <!-- full calendar -->
    <script src="assets/js/full-calendar.js"></script>
    <!-- jQuery UI -->
    <script src="assets/js/jquery-ui.js"></script>
    <!-- jQuery UI -->
    <script src="assets/js/editor-quill.js"></script>
    <!-- apex charts -->
    <script src="assets/js/apexcharts.min.js"></script>
    <!-- Calendar Js -->
    <script src="assets/js/calendar.js"></script>
    <!-- jvectormap Js -->
    <script src="assets/js/jquery-jvectormap-2.0.5.min.js"></script>
    <!-- jvectormap world Js -->
    <script src="assets/js/jquery-jvectormap-world-mill-en.js"></script>


    <!-- main js -->
    <script src="assets/js/main.js"></script>
    <script>
    // Ensure all nested submenus are hidden on page load and toggle works after DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('.nested-submenu').forEach(function(sub) {
            sub.style.display = 'none';
        });
        document.querySelectorAll('.toggle-nested').forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                var submenu = this.nextElementSibling;
                if (submenu && submenu.classList.contains('nested-submenu')) {
                    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    });
    </script>

</body>
</html>