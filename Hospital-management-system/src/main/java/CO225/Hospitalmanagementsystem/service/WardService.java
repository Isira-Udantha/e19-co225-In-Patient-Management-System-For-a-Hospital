package CO225.Hospitalmanagementsystem.service;

import CO225.Hospitalmanagementsystem.entity.Ward;
import CO225.Hospitalmanagementsystem.model.WardInfoModel;
import CO225.Hospitalmanagementsystem.repository.WardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WardService {

    @Autowired
    private WardRepository wardRepository;
}


