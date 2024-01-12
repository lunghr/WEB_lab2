<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="styles.css">
    <title>Title</title>
</head>
<body>

<header>
    Тупиченко Милана Алексеевна
    <br>P3209  вариант 1975
</header>
<section id="graph">
    <canvas id="canvas" width="400" height="400"></canvas>
</section>
<form id="user-input" action="" method="get">
    <section id="input-section">
        <div id="checkboxes">
            <label>
                <input type="checkbox" name="x" value="-2">
                -2
            </label>
            <label>
                <input type="checkbox" name="x" value="-1.5">
                -1.5
            </label>
            <label>
                <input type="checkbox" name="x" value="-1">
                -1
            </label>
            <label>
                <input type="checkbox" name="x" value="-0.5">
                -0.5
            </label>
            <label>
                <input type="checkbox" name="x" value="0">
                0
            </label>
            <label>
                <input type="checkbox" name="x" value="0.5">
                0.5
            </label>
            <label>
                <input type="checkbox" name="x" value="1">
                1
            </label>
            <label>
                <input type="checkbox" name="x" value="1.5">
                1.5
            </label>
            <label>
                <input type="checkbox" name="x" value="2">
                2
            </label>
        </div>
        <div id="y-input">
            <%--@declare id="y-label"--%>
            <label for="y-label">Enter y coordinate:</label>
            <label for="y-input-field"></label><input id="y-input-field" name = "y" type="text" placeholder="Enter num from -5 to 3">
            <br>
            <span id="y-error" >Incorrect Y parameter</span>
        </div>
        <div id="r-buttons">
            <%--@declare id="r-label"--%>
            <label for="r-label">Choose R parameter:</label>
            <input class="r-button"  type="button" value="1">
            <input class="r-button" type="button" value="1.5">
            <input class="r-button" type="button" value="2">
            <input class="r-button"  type="button" value="2.5">
            <input class="r-button"  type="button" value="3">
            <br>
        </div>
        <input id="R-storage" type="text" hidden="hidden">
    </section>
    <button type="button" id="submit-button">check</button>
    <button type="button" id="submit-r-button">set radius</button>
    <div id="error-message"></div>
</form>
<button onclick="document.location='resultsTable.jsp'">таблица результатов</button>
<section class="output-container">
    <section id="history-block">
        <section id="labels">
            <label id="history-label">Arguments</label>
            <label id="time-label">Time</label>
            <label id="exTime-label">Execution time</label>
            <label id="hitting-label">Hitting</label>
        </section>
        <section id="history-section">
            <div id="history"></div>
            <div id="time"></div>
            <div id="execution-time"></div>
            <div id="hitting"></div>
        </section>
        <input id="history-storage" type="text" hidden="hidden">
    </section>
</section>
<button type="button" id="clear-button">check</button>
<button onclick="document.location='resultsTable.jsp'">таблица результатов</button>
<div id="response"></div>
<script defer src="JavaScript/graph.js"></script>
<script defer src="JavaScript/index.js"></script>
<script defer src="JavaScript/utils.js"></script>


</body>
</html>
