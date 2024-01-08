import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
@WebServlet("/data-servlet")
public class DataServlet extends HttpServlet {
    private static final String ATTRIBUTE = "data";

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        PrintWriter out = response.getWriter();
        Object data = session.getAttribute(ATTRIBUTE);
        response.setContentType("text/plain; charset=utf-8");

        if (data == null) {
            response.setStatus(400);
            out.print("No data available");
            return;
        }

        response.setStatus(200);
        out.print(data.toString());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        PrintWriter out = response.getWriter();
        response.setContentType("text/plain; charset=utf-8");

        BufferedReader reader = request.getReader();
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
            sb.append(line);
        }

        String data = sb.toString();

        session.setAttribute(ATTRIBUTE, data);
        response.setStatus(200);
        out.print("Value of form data has updated");
    }
}