package CO225.Hospitalmanagementsystem.config;

import CO225.Hospitalmanagementsystem.filter.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@EnableWebSecurity
//@EnableMethodSecurity
public class SecurityConfig {
    @Autowired
    private JwtAuthFilter authFilter;
    @Bean
    public UserDetailsService userDetailsService(){
//        UserDetails admin = User.withUsername("Admin")
//                .password(encoder.encode("admin"))
//                .roles("ADMIN")
//                .build();
//
//        UserDetails doctor = User.withUsername("Doctor")
//                .password(encoder.encode("1234"))
//                .roles("DOCTOR")
//                .build();
//
//        UserDetails user = User.withUsername("User")
//                .password(encoder.encode("user"))
//                .roles("USER")
//                .build();
//        return  new InMemoryUserDetailsManager(admin, user, doctor);
        return new UserInfoUserDetailsService();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//         return http.csrf((csrf) -> csrf.disable())
//                .authorizeHttpRequests((authorizeHttpRequests)->
//                        authorizeHttpRequests
//                                .requestMatchers("/", "/admin", "/admin/new").permitAll()
//
//                )
//
//                .authorizeHttpRequests((authorizeHttpRequests) ->
//                        authorizeHttpRequests
//                                .requestMatchers("/doctor").hasRole("DOCTOR")
//
//                        )
//                .formLogin(Customizer.withDefaults())
//                 .build();

        DefaultSecurityFilterChain build = http.csrf().disable().authorizeHttpRequests()
                .requestMatchers("/", "/admin/welcome", "/admin/staff", "admin/ward", "admin/authenticate",
                        "admin/doctors"      ,"/addPatients","/records").permitAll()
                .and()
                .authorizeHttpRequests().requestMatchers("/doctor").authenticated()//hasRole("DOCTOR")
//                for jwt token
                        .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
       // .and().formLogin().and().build();
        return build;


    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }



}
