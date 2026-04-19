const logout = async (e) => {
    // Prevent the button/link from refreshing the page on its own
    if (e) {
    e.preventDefault();
    e.stopPropagation();
    }

    let logout_url = window.location.origin + "/djangoapp/logout";

    try {
    const res = await fetch(logout_url, {
        method: "GET", // Keep as GET for now since your view expects it
    });

    if (res.ok) {
        const json = await res.json();
        if (json) {
        // Clear session storage and reload page
        let username = sessionStorage.getItem('username');
        sessionStorage.removeItem('username');
        window.location.href = window.location.origin;
        window.location.reload();
        // Notify user of logout
        alert("Logging out " + username + "...")
        }
        else {
        alert("The user could not be logged out.")
        }
    }
    } catch (err) {
    console.error("Logout error:", err);
    }
};

let checkSession = () => {
    let curr_user = sessionStorage.getItem("username");

    if (curr_user && curr_user !== "") {
    /*         document.getElementById("loginlogout").innerHTML =
                '<div className="input_panel><text className="username" style="font-size: larger;">' + curr_user + '</text>' + '<a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a></div>'; */

    document.getElementById("username").innerHTML =
        '<a class="nav-link" style="font-size: larger;" href="/profile">' + curr_user + '</a>';
    document.getElementById("logout").innerHTML =
        '<a class="nav-link" style="font-size: larger;" onclick="logout(event)" href="/">Logout</a>'
    } else {
    document.getElementById("login").innerHTML =
        '<a class="nav-link" style="font-size: larger;" href="/login">Login</a>';
    document.getElementById("register").innerHTML =
        '<a class="nav-link" style="font-size: larger;" href="/register">Register</a>';
    }
}