import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;


@WebServlet("/checkServlet")
public class AreaCheckServlet extends HttpServlet {
    double[] x;
    double y;
    double r;

    String[] hits;
    String[] execution;


    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        System.out.println("NUTS");
        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        LocalDateTime startTime = LocalDateTime.now();


        String[] tmp= request.getParameter("X").split(",");
        x = new double[tmp.length];
        hits = new String[tmp.length];
        execution = new String[tmp.length];

        for (int i = 0; i < tmp.length; i++) {
            x[i] = Double.parseDouble(tmp[i]);
        }

        y = Double.parseDouble(request.getParameter("Y").replace(",", "."));
        r = Double.parseDouble(request.getParameter("R"));


        for (int i = 0; i < x.length; i++) {
            DataValidation dot = new DataValidation(x[i], y, r);
//
//            if (!dot.isDataValid()) {
//                System.out.println("Invalid data");
//                return;
//            }

            if(dot.checkHits()){
                hits[i] = "hit";
            }
            else {hits[i] = "lose";}

            execution[i] = String.valueOf(Duration.between(startTime, LocalDateTime.now()).toMillis());



        }

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");


        StringBuilder sb = new StringBuilder();
        StringBuilder hitting = new StringBuilder();
        StringBuilder exTime = new StringBuilder();
        for (int i = 0; i < x.length; i++) {
            sb.append(x[i]);
            hitting.append(hits[i]);
            exTime.append(execution[i]);

            if (i < x.length - 1) {
                sb.append(",");
                hitting.append(",");
                exTime.append(",");
            }
        }

        String X = sb.toString();
        String res = X+";" + request.getParameter("Y") + ";" +
                request.getParameter("R") + ";" + hitting +
                ";" + exTime + ";" + LocalDateTime.now().format(formatter);


        out.print(res);

        HttpSession session = request.getSession();
        session.setAttribute("test", res);
        out.close();
    }
}
