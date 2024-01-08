//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import models.Bean;
//import models.Dot;
//
//import java.time.Duration;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//
//public class main {
//    public static void main(String[] args) {
//
//        String hit;
//
//        LocalDateTime startTime = LocalDateTime.now();
//
//        String[] tmp= {"1"};
//        double[] x = new double[tmp.length];
//
//
//        for (int i = 0; i < tmp.length; i++) {
//            x[i] = Double.parseDouble(tmp[i]);
//        }
//
//        double y = 2;
//        double r = 2;
//
//        Bean bean = new Bean();
//
//        for (int i = 0; i < x.length; i++) {
//            DataValidation dot = new DataValidation(x[i], y, r);
////
////            if (!dot.isDataValid()) {
////                System.out.println("Invalid data");
////                return;
////            }
//
//            if(dot.checkHits()){
//                hit = "hit";
//            }
//            else {hit = "lose";}
//
//            String executionTime = String.valueOf(Duration.between(startTime, LocalDateTime.now()).toMillis());
//            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm:ss");
//            String time = LocalDateTime.now().format(formatter);
//            Dot newDot = new Dot(x[i], y, r, time, executionTime, hit);
//
//            bean.add(newDot);
//
//        }
//
//
//
//        ObjectMapper objectMapper = new ObjectMapper();
//        String jsonResult = null;
//        try {
//            jsonResult = objectMapper.writeValueAsString(bean);
//            System.out.println(jsonResult);
//        } catch (JsonProcessingException e) {
//            throw new RuntimeException(e);
//        }
//
//    }
//}
//
