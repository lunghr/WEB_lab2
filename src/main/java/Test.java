import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/test")

public class Test extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Получение сессии из запроса
        HttpSession session = request.getSession();
        System.out.println("Session ID: " + session.getId());
        PrintWriter out = response.getWriter();
        // Сохранение строки "meow" в атрибуте сессии
        session.setAttribute("myString", "meow");

        // Отправка ответа клиенту
        response.setContentType("text/plain; charset=UTF-8");
        out.println("String 'meow' has been saved in session.");
    }
}